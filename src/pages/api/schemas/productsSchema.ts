import Joi from '@hapi/joi';

interface ProductsSchema {
    name: string;
    description: string;
    sku: string;
    value: number;
}

export const productsSchema = Joi.object<ProductsSchema>({
    name: Joi.string().min(1).max(50).required(),
    description: Joi.string().min(1).max(100).required(),
    sku: Joi.string().min(1).max(50).required(),
    value: Joi.number().required()
})

