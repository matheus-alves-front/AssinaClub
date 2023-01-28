import Joi from '@hapi/joi';

interface LoginAttemptSchema {
    email: string;
    password: string;
    typeOfUser: string;
}

export const loginAttemptSchema = Joi.object<LoginAttemptSchema>({
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(),
    typeOfUser: Joi.string().valid("subscriber", "clubProvider").required(),
})