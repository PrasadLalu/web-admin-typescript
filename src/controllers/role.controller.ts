import { Request, Response } from 'express';
import { RoleService } from '@services';
import ErrorHelper from '../helpers/error.helper';

export class RoleController {
    private roleService: RoleService;
    constructor() {
        this.roleService = new RoleService();
    }

    async create(request: Request, response: Response): Promise<void> {
        try {
            const { body } = request;
            const result = await this.roleService.create(body);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    async findAll(request: Request, response: Response): Promise<void> {
        try {
            const result = await this.roleService.findAll();
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    async findById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            const result = await this.roleService.findById(id);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    async deleteById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            const result = await this.roleService.deleteById(id);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }
}
