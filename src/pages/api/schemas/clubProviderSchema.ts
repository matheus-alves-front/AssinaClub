import Joi from '@hapi/joi';

interface ClubProviderRegisterSchema {
    clubName: string;
    hostName: string;
    cpf: string;
    cnpj: string;
    email: string;
    password: string;
    description: string;
}

export const clubProviderRegisterSchema = Joi.object<ClubProviderRegisterSchema>({
    clubName: Joi.string().min(1).max(30).required(),
    hostName: Joi.string().min(1).max(30).required(),
    cpf: Joi.string().length(11).allow(""),
    cnpj: Joi.string().length(14).allow(""),
    email: Joi.string().email().required(),
    password: Joi.string().min(1).required(), 
    description: Joi.string().min(1).max(250).required(),
})