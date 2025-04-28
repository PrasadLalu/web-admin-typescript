import Joi, { ObjectSchema } from 'joi';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

export const joiValidator = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const valid = error == null;

    if (!valid) {
        const messages = error.details.map((i: Joi.ValidationErrorItem) => i.message);

        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({
            code: StatusCodes.UNPROCESSABLE_ENTITY,
            status: 'failed',
            errors: messages,
        });
        return;
    }
    next();
};
