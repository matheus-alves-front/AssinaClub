import type { NextApiResponse, NextApiRequest } from 'next'
import { ValidationErrorItem } from '@hapi/joi';

export default function validateErrorsInSchema(req: NextApiRequest, res: NextApiResponse, next: any, schema: any) {

    const { method } = req

    if (!schema || !['POST'].includes(String(method)) || !req.body) return next()

    const validated = schema.validate(
        { ...(!!req?.body?.body ? JSON.parse(req.body.body) : req.body) },
        { abortEarly: false }
    )

    if (validated?.error) {
        const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

        return res.status(422).json({
            message: detailedErros
        })
    }

    if (!!req?.body?.body) req.body = JSON.parse(req.body.body)

    next()
}