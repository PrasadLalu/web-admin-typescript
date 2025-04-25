import { omit } from 'lodash';
import { PrismaClient } from '@prisma/client';
import { MESSAGES } from '@constants';
import { created, success, notFound, conflict, unauthorized } from '@statusCode';
import { hashPassword, comparePasswords, generateToken } from '@utils';
import { LoginUserRequestDto, RegisterUserRequestDto } from '@types';

const prisma = new PrismaClient();

export class AuthService {
    constructor() { }
    async registerUser(body: RegisterUserRequestDto) {
        const { name, email, password, roleId } = body;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
            }
        });
        if (existingUser) {
            return { ...conflict, message: MESSAGES.USER_ALREADY_CREATED };
        }

        // Find role
        const role = await prisma.role.findUnique({
            where: {
                id: roleId,
                deleted: false,
            }
        });
        if (!role) {
            return { ...notFound, message: MESSAGES.ROLE_NOT_FOUND };
        }

        // Encrypt password
        const encryptPassword = await hashPassword(password);

        // Register new user
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: encryptPassword,
                roleId,
            }
        });

        const user = omit(newUser, ['password']);
        return { ...created, data: user };
    }

    async loginUser(body: LoginUserRequestDto) {
        const { email, password } = body;

        // Check user by email
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return { ...unauthorized, message: MESSAGES.USER_NOT_REGISTERED };
        }

        // Match password
        const isPasswordValid = await comparePasswords(password, user.password);
        if (!isPasswordValid) {
            return { ...unauthorized, message: MESSAGES.MISMATCHED_PASSWORD };
        }

        // Generate token
        const token = await generateToken({ id: user.id, email });

        const sanitizedUser = omit(user, ['password']);
        return {
            ...success,
            data: sanitizedUser,
            token,
        };
    }
}
