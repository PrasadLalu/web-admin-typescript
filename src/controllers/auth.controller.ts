import { Request, Response } from 'express';
import { AuthService } from '@services';
import { ErrorHelper} from '@errorHelper';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    async login(request: Request, response: Response): Promise<void> {
        try {
            const { body } = request;
            const result = await this.authService.loginUser(body);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    async register(request: Request, response: Response): Promise<void> {
        try {
            const { body } = request;
            const result = await this.authService.registerUser(body);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }
}
