import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from 'express-serve-static-core'
import { upload } from '../../../configs/S3Config'
import { createRouter } from 'next-connect'
import { handleDeleteSubscriber, handleGetSubscriber, handlePutSubscriber } from '../../../controllers/subscribers'
import validateSubscriberExistence from '../../../middleware/validateSubscriberExistence'

type CustomRequest = NextApiRequest & Request<any> & {
    file: {
        location: string
    }
}

type CustomResponse = NextApiResponse & Response<any>

const subscriberRouter = createRouter<CustomRequest, CustomResponse>();

subscriberRouter
    .use(upload.single('file'))
    .use(validateSubscriberExistence)
    .get(handleGetSubscriber)
    .put(handlePutSubscriber)
    .delete(handleDeleteSubscriber)

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
