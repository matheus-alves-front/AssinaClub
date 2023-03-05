import type { NextApiResponse, NextApiRequest } from 'next'
import { ValidationErrorItem } from '@hapi/joi';
import { NextHandler } from 'next-connect';

export default function validateErrorsInSchema(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler,
    schema: any
) {
    if (!schema || !['POST'].includes(req.method as string) || !req.body) return next()

    if (!!req?.body?.body) req.body = JSON.parse(req.body.body)

    const validated = schema.validate(
        { ...req.body },
        { abortEarly: false }
    )

    if (validated?.error) {
        const detailedErros = validated?.error?.details.map(
            (error: ValidationErrorItem) => error.message.replaceAll('\"', '')
        )
        return res.status(422).json({
            message: detailedErros
        })
    }

    next()
}