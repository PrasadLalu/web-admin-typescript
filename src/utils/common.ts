import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (plainPassword: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plainPassword, salt);
};

export const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateToken = async (payload: any) => {
    return jwt.sign(payload, 'secret', { expiresIn: '1h' });
};
