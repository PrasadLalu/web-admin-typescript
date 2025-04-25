import Joi from 'joi';

export const loginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, ' +
                'one lowercase letter, one number, and one special character.',
            'string.min': 'Password must be at least 8 characters long.',
            'any.required': 'Password is required.',
        }),
});

export const registerUser = Joi.object({
    name: Joi.string().trim().min(3).required(),
    email: Joi.string().email().required(),
    roleId: Joi.string().uuid().required(),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, ' +
                'one lowercase letter, one number, and one special character.',
            'string.min': 'Password must be at least 8 characters long.',
            'any.required': 'Password is required.',
        }),
});