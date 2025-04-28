import { PrismaClient } from '@prisma/client';
import { notFound, success } from '@statusCode';
import { MESSAGES } from '@constants';
import { selectUserFields } from '@utils';

const prisma = new PrismaClient();

export class UserService {
    constructor() {}

    async findAll() {
        const users = await prisma.user.findMany({
            where: {
                isBanned: false,
                isDeleted: false,
            },
            select: selectUserFields(),
            orderBy: {
                updatedAt: 'desc',
            }
        });

        return { ...success, data: users };
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
