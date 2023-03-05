import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter } from 'next-connect';
import { upload } from '../../../configs/S3Config';
import { handleGetSubscribers, handlePostSubscribers } from '../../../controllers/subscribers';
import validateErrorsInSchema from '../../../middleware/validateErrosInSchema';
import { subscriberRegisterSchema } from '../schemas/subscriberSchema';
import { validateSubscriberEmailConflict } from '../../../middleware/validateSubscriberEmailConflict';

type CustomRequest = NextApiRequest & Request & {
    file: {
        location: string
    }
}

type CustomResponse = NextApiResponse & Response<any>

const subscribersRouter = createRouter<CustomRequest, CustomResponse>();

subscribersRouter
    .use(upload.single('file'))
    .use(async (req, res, next) => {
        return validateErrorsInSchema(req, res, next, subscriberRegisterSchema)
    }
    )
    .use(validateSubscriberEmailConflict)
    .get(handleGetSubscribers)
    .post(handlePostSubscribers)

export default subscribersRouter.handler({
    onError: (err: any, _, res) => {
        res.status(500).json({
            message: `Something broke!`,
            error: `${err}`
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
