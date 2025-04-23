import { PrismaClient } from '@prisma/client';
import { MESSAGES } from '@constant';
import { created, success, notFound, conflict, noContent } from '@statusCode';

const prisma = new PrismaClient();

const create = async (body: any) => {
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

const findAll = async () => {
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

const findById = async (id: string) => {
    const query = findByIdQuery(id);
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

const deleteById = async (id: string) => {
    const query = findByIdQuery(id);
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

const findByIdQuery = (id: string) => {
    return {
        where: {
            id,
            deleted: false,
        },
    };
};


export default { create, findAll, findById, deleteById };
