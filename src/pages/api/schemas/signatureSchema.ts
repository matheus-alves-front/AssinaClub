import Joi from '@hapi/joi';

interface SignatureUpdateSchema {
    isPaid: boolean,
    clubAssinatureId: string,
    planIds: string,
    unsubscribe: boolean,
}

export const signatureUpdateSchema = Joi.object<SignatureUpdateSchema>({
    isPaid: Joi.boolean().required(),
    clubAssinatureId: Joi.string().length(24).required(),
    planIds: Joi.string().length(24).required(),
    unsubscribe: Joi.boolean(),
})