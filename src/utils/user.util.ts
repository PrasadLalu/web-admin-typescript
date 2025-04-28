import { PAGE, PER_PAGE } from '@constants';
import { Prisma } from '@prisma/client';
import { Request } from 'express';

export const selectUserFields = () => {
    return {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        role: {
            select: {
                name: true,
                description: true,
            },
        },
    };
};

export const getPaginationParams = (
    query: Request['query'],
    defaultPage: number = PAGE,
    defaultPerPage: number = PER_PAGE
): { page: number; perPage: number } => {
    const page = Math.max(1, parseInt(String(query.page), 10) || defaultPage);
    const perPage = Math.max(1, parseInt(String(query.perPage), 10) || defaultPerPage);
    return { page, perPage };
};

export const activeUserWhere: Prisma.UserWhereInput = {
    OR: [
        { isBanned: false },
        { isDeleted: false },
    ],
};
