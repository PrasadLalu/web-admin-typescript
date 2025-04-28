import { Request, Response } from 'express';
import { UserService } from '@services';
import { ErrorHelper } from '@errorHelper';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async findAll(request: Request, response: Response): Promise<void> {
        try {
            const { query } = request;
            const result = await this.userService.findAll(query);
            response.status(result.code).send(result);
            return;
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
            return;
        }
    }

    async findById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            const result = await this.userService.findById(id);
            response.status(result.code).send(result);
            return;
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
            return;
        }
    }
}
