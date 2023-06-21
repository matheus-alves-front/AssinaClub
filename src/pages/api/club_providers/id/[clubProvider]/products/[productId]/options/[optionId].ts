import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import { Request, Response } from 'express-serve-static-core'
import { upload } from '../../../../../../../../configs/S3Config'
import { OPTIONS_IMAGES_MAX_AMOUNT } from '.'
import validateClubProviderExistence from '../../../../../../../../middleware/validateClubProviderExistence'
import { validateProductExistence } from '../../../../../../../../middleware/validateProductExistence'
import { handleDeleteOption, handleGetOption, handlePutOption } from '../../../../../../../../controllers/options'

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

type CustomResponse = NextApiResponse & Response

const optionsRouter = createRouter<CustomRequest, CustomResponse>()

optionsRouter
    .use(upload.array('file', OPTIONS_IMAGES_MAX_AMOUNT))
    .use(validateClubProviderExistence)
    .use(validateProductExistence)
    .get(handleGetOption)
    .post(handlePutOption)
    .delete(handleDeleteOption)

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
