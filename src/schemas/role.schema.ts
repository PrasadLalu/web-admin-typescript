import Joi from 'joi';
import { ROLE_TYPE } from '@enums';

export const createRole = Joi.object({
    name: Joi.string().trim().min(3).valid(...Object.values(ROLE_TYPE)).required(),
    description: Joi.string().trim().allow('', null).optional()
});
