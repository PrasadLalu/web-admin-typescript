import { PrismaClient } from '@prisma/client';
import { notFound, success } from '@statusCode';
import { MESSAGES } from '@constant';
import {selectUserFields} from '../utils/userUtil';

const prisma = new PrismaClient();

export class UserService {
    constructor() {}

    async findAll() {
        const users = await prisma.user.findMany({
            where: {
                deleted: false,
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
            where: { id, deleted: false },
            select: selectUserFields(),
        });
        if (!user) {
            return { ...notFound, message: MESSAGES.USER_NOT_FOUND };
        }

        return { ...success, data: user };
    }
};
