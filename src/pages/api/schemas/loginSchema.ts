import Joi from '@hapi/joi';

interface LoginAttemptSchema {
    email: string;
    password: string;
}

export const loginAttemptSchema = Joi.object<LoginAttemptSchema>({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
})