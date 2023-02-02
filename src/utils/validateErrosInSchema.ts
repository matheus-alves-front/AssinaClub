import type { NextApiResponse, NextApiRequest } from 'next'
import { ValidationErrorItem } from '@hapi/joi';

export default function validateErrorsInSchema(schema: any, req: NextApiRequest, res: NextApiResponse) {    

    const validated = schema.validate({ ...req.body }, { abortEarly: false })

    if (validated?.error) {
        const detailedErros = validated?.error?.details.map((error: ValidationErrorItem) => error.message.replaceAll('\"', ''))

        return res.status(422).json({
            message: detailedErros
        })
    }
    return 'ok'
}