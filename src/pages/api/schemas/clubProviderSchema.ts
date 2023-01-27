import Joi from '@hapi/joi';

interface ClubProviderRegisterSchema {
    clubName: string;
    hostName: string;
    cpf: string;
    cnpj: string;
    creationDate: Date;
    email: string;
    password: string;
    description: string;
    custom: any
}

export const clubProviderRegisterSchema = Joi.object<ClubProviderRegisterSchema>({
    clubName: Joi.string().min(1).max(30).required(),
    hostName: Joi.string().min(1).max(30).required(),
    cpf: Joi.string().length(11),
    cnpj: Joi.string().length(14),
    creationDate: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().length(60).required(), // size of bcrypt hash is 60
    description: Joi.string().min(1).max(250).required(),
})