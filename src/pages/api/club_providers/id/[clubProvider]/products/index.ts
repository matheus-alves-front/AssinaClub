import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors'
import { upload } from '../../../../../../configs/S3Config';
import { handleDeleteProducts, handleGetProducts, handlePostProducts } from '../../../../../../controllers/products';
import { getClubProvider } from '../../../../../../prisma/clubProviders';
import validateErrorsInSchema from '../../../../../../middleware/validateErrosInSchema';
import { productsSchema } from '../../../../schemas/productsSchema';

type CustomRequest = NextApiRequest & Request<any> & {
    files: {
        location: string
    }[]
}

type CustomResponse = NextApiResponse & Response<any>

const productsRouter = createRouter<CustomRequest, CustomResponse>();

const PRODUCTS_IMAGES_MAX_AMOUNT = 5

productsRouter
    .use(expressWrapper(cors()))
    .use(upload.array('file', PRODUCTS_IMAGES_MAX_AMOUNT))
    .use(async (req, res, next) => {
        const clubProviderId = String(req.query.clubProvider)               
        const clubProvider = await getClubProvider(clubProviderId)
        if (clubProvider) return next()
        else return res.status(404).json({
            message: "Provider not found!"
        })
    }
    )
    .use(async (req, res, next) => (
        validateErrorsInSchema(req, res, next, productsSchema)
    )
    )
    .get(handleGetProducts)
    .post(handlePostProducts)
    .delete(handleDeleteProducts)

export default productsRouter.handler({
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

export const config = {
    api: {
        bodyParser: false,
    }
}
