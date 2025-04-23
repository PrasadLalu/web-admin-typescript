import { Request, Response } from 'express';
import roleService from '../services/roleService';
import ErrorHelper from '../helpers/error.helper';

class RoleController {
    static async create(request: Request, response: Response): Promise<void> {
        try {
            const { body } = request;
            const result = await roleService.create(body);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    static async findAll(request: Request, response: Response): Promise<void> {
        try {
            const result = await roleService.findAll();
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    static async findById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            const result = await roleService.findById(id);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }

    static async deleteById(request: Request, response: Response): Promise<void> {
        try {
            const { id } = request.params;
            const result = await roleService.deleteById(id);
            response.status(result.code).send(result);
        } catch (error) {
            const appError = ErrorHelper.error(error);
            response.status(appError.code).send(appError);
        }
    }
}

export default RoleController;
