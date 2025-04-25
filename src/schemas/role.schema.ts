import Joi from 'joi';

export const createRole = Joi.object({
    name: Joi.string().trim().min(3).required(),
    description: Joi.string().trim().allow('', null).optional()
});
