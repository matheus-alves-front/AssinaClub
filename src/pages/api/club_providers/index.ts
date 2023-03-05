import type { NextApiRequest, NextApiResponse } from 'next'
import validateErrorsInSchema from '../../../middleware/validateErrosInSchema';
import { Request, Response } from "express-serve-static-core"
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors'
import { handleGetClubProviders, handlePostClubProviders } from '../../../controllers/clubProviders';
import { clubProviderRegisterSchema } from '../schemas/clubProviderSchema';
import { validateClubProviderConflict } from '../../../middleware/validateClubProviderConflict';
import { upload } from '../../../configs/S3Config';

type CustomRequest = NextApiRequest & Request<any> & {
    files: {
        location: string
    }[]
}

type CustomResponse = NextApiResponse & Response<any>

const clubProvidersRouter = createRouter<CustomRequest, CustomResponse>();

clubProvidersRouter
    .use(expressWrapper(cors()))
    .use(upload.array('file', 2))
    .use(async (req, res, next) => (
        validateErrorsInSchema(req, res, next, clubProviderRegisterSchema)
    )
    )
    .use(validateClubProviderConflict)
    .get(handleGetClubProviders)
    .post(handlePostClubProviders)

export default clubProvidersRouter.handler({
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