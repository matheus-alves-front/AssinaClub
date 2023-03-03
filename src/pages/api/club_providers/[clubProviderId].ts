import type { NextApiRequest, NextApiResponse } from 'next'
import validateErrorsInSchema from '../../../middleware/validateErrosInSchema';
import { Request, Response } from "express-serve-static-core"
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors'
import { handleDeleteClubProviderById, handleGetClubProviderById, handlePutClubProvidersById } from '../../../controllers/clubProvidersController';
import { clubProviderRegisterSchema } from '../schemas/clubProviderSchema';
import { validateClubProviderConflict } from '../../../middleware/validateClubProviderConflict';
import { upload } from '../../../configs/S3Config';

type CustomRequest = NextApiRequest & Request<any> & {
    files: {
        location: string
    }[]
}

type CustomResponse = NextApiResponse & Response<any>

const clubProviderRouter = createRouter<CustomRequest, CustomResponse>();

clubProviderRouter
    .use(expressWrapper(cors()))
    .use(upload.array('file', 2))
    .use(async (req, res, next) => (
        validateErrorsInSchema(req, res, next, clubProviderRegisterSchema)
    )
    )
    .use(async (req, res, next) => (
        validateClubProviderConflict(req, res, next)
    )
    )
    .get(handleGetClubProviderById)
    .put(handlePutClubProvidersById)
    .delete(handleDeleteClubProviderById)

export default clubProviderRouter.handler({
    onError: (err: any, _, res) => {
        console.log(err)
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