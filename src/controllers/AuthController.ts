import { Request, Response } from 'express';
import authService from '../services/authService';
import ErrorHelper from '../helpers/error.helper';

class AuthController {
    static async login(request: Request, response: Response): Promise<void> {
        try {
            const { body } = request;
            const result = await authService.loginUser(body);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    static async register(request: Request, response: Response): Promise<void> {
        try {
            const { body } = request;
            const result = await authService.registerUser(body);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }
}

export default AuthController;
