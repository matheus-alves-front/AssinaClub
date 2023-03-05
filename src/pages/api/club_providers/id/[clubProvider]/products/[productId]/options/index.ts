import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { upload } from '../../../../../../../../configs/S3Config'
import { Request, Response } from 'express-serve-static-core'
import validateClubProviderExistence from '../../../../../../../../middleware/validateClubProviderExistence'
import validateErrorsInSchema from '../../../../../../../../middleware/validateErrosInSchema'
import { optionRegisterSchema } from '../../../../../../schemas/optionSchema'
import { handleGetOptions, handlePostOptions } from '../../../../../../../../controllers/options'
import { validateProductExistence } from '../../../../../../../../middleware/validateProductExistence'

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

type CustomResponse = NextApiResponse & Response

export const OPTIONS_IMAGES_MAX_AMOUNT = 5

const optionsRouter = createRouter<CustomRequest, CustomResponse>()

optionsRouter
    .use(upload.array('file', OPTIONS_IMAGES_MAX_AMOUNT))
    .use(validateClubProviderExistence)
    .use(validateProductExistence)
    .use(async (req, res, next) => (
        validateErrorsInSchema(req, res, next, optionRegisterSchema)
    )
    )
    .get(handleGetOptions)
    .post(handlePostOptions)

export default optionsRouter.handler({
    onError: (err: any, _, res) => {
        console.error(err)
        res.status(500).json({
            message: "Something broke!"
        });
    },
    onNoMatch: (_, res) => {
        res.status(404).json({
            message: "Page is not found"
        });
    },
});

export const config = {
    api: {
        bodyParser: false,
    }
}
