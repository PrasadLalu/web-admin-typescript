import { PrismaClient } from '@prisma/client';
import { notFound, success } from '@statusCode';
import { MESSAGES } from '@constants';
import { selectUserFields, getPaginationParams, activeUserWhere } from '@utils';

const prisma = new PrismaClient();

export class UserService {
    constructor() { }

    async findAll(query: any) {
        const { page, perPage } = getPaginationParams(query);
        const skip = (page - 1) * perPage;

        const [users, total] = await prisma.$transaction([
            prisma.user.findMany({
                where: activeUserWhere,
                skip,
                take: perPage,
                select: selectUserFields(),
                orderBy: { updatedAt: 'desc' },
            }),
            prisma.user.count({ where: activeUserWhere }),
        ]);

        return {
            ...success, data: users,
            pagination: {
                page,
                perPage,
                total,
                totalPages: Math.ceil(total / perPage),
            }
        };
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique({
            where: {
                id,
                isBanned: false,
                isDeleted: false,
            },
            select: selectUserFields(),
        });
        if (!user) {
            return { ...notFound, message: MESSAGES.USER_NOT_FOUND };
        }

        return { ...success, data: user };
    }
};
