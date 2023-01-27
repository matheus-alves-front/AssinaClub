import Joi from '@hapi/joi';

interface SubscriberRegisterSchema {
    name:string
    cpf: string;
    birthDate: Date;
    email: string;
    password: string;
}

export const subscriberRegisterSchema = Joi.object<SubscriberRegisterSchema>({
    name: Joi.string().min(1).max(30).required(),
    cpf: Joi.string().length(11),
    birthDate: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(60).required(), // size of bcrypt hash is 60
})