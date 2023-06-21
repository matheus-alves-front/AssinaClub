import Joi from '@hapi/joi'

interface OptionRegisterSchema {
    title: string
    options: string
}

export const optionRegisterSchema = Joi.object<OptionRegisterSchema>({
    title: Joi.string().required(),
    options: Joi.array().required(),
})

