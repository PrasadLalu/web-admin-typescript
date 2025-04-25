import { Request, Response } from 'express';
import UserService from '../services/UserService';
import ErrorHelper from '../helpers/error.helper';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async findAll(request: Request, response: Response): Promise<void> {
        try {
            const result = await this.userService.findAll();
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    async findById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            const result = await this.userService.findById(id);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }
}

export default UserController;
