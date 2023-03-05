import Joi from '@hapi/joi';

interface PlanRegisterSchema {
    title: string
    description: string
    price: number
    deliveryFrequency: number
}

export const planRegisterSchema = Joi.object<PlanRegisterSchema>({
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(200).required(),
    price: Joi.number().required(),
    deliveryFrequency: Joi.number().required(),
})