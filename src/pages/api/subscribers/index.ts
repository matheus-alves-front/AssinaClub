import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors'
import { upload } from '../../../configs/S3Config';
import { handleGetSubscribers, handlePostSubscribers } from '../../../controllers/subscribers';
import validateErrorsInSchema from '../../../middleware/validateErrosInSchema';
import { subscriberRegisterSchema } from '../schemas/subscriberSchema';

type CustomRequest = NextApiRequest & Request<any> & {
    file: {
        key: string
    }
}

type CustomResponse = NextApiResponse & Response<any>

const subscriberRouter = createRouter<CustomRequest, CustomResponse>();

subscriberRouter
    .use(expressWrapper(cors()))
    .use(upload.single('file'))
    .use(async (req, res, next) => {
        return validateErrorsInSchema(req, res, next, subscriberRegisterSchema)
    }
    )
    .get(handleGetSubscribers)
    .post(handlePostSubscribers)

export default subscriberRouter.handler({
    onError: (err: any, _, res) => {
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
