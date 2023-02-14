import Joi from '@hapi/joi';

interface AdminRegisterSchema {
    name: string;
    birthDate: string;
    email: string;
    password: string;
    occupation: string;
}

export const adminRegisterSchema = Joi.object<AdminRegisterSchema>({
    name: Joi.string().min(1).max(30).required(),
    birthDate: Joi.string().length(10).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(), 
    occupation: Joi.string().min(1).required()
})

