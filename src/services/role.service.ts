import { PrismaClient } from '@prisma/client';
import { MESSAGES } from '@constant';
import { created, success, notFound, conflict, noContent } from '@statusCode';

const prisma = new PrismaClient();

export class RoleService {
    constructor() { }

    async create(body: any) {
        const { name, description } = body;

        // Check if role already exists
        const existingRole = await prisma.role.findFirst({
            where: { name },
        });
        if (existingRole) {
            return {
                ...conflict,
                message: MESSAGES.ROLE_ALREADY_CREATED,
            };
        }

        // Create new role
        const newRole = await prisma.role.create({
            data: {
                name,
                description,
            },
        });

        return {
            ...created,
            data: newRole,
        };
    };

    async findAll() {
        const roles = await prisma.role.findMany({
            where: {
                deleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            }
        });

        return {
            ...success,
            data: roles,
        };
    };

    async findById(id: string) {
        const query = this._findByIdQuery(id);
        const role = await prisma.role.findUnique(query);
        if (!role) {
            return {
                ...notFound,
                message: MESSAGES.ROLE_NOT_FOUND,
            };
        }

        return {
            ...success,
            data: role,
        };
    };

    async deleteById(id: string) {
        const query = this._findByIdQuery(id);
        const role = await prisma.role.findUnique(query);
        if (!role) {
            return {
                ...notFound,
                message: MESSAGES.ROLE_NOT_FOUND,
            };
        }

        // SOFT Delete
        await prisma.role.update({
            where: { id },
            data: {
                deleted: true,
            },
        });

        return { ...noContent };
    };

    _findByIdQuery = (id: string) => {
        return {
            where: {
                id,
                deleted: false,
            },
        };
    };
}
