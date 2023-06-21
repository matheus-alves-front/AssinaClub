import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter } from 'next-connect'
import { upload } from '../../../../../../../configs/S3Config'
import validateClubProviderExistence from '../../../../../../../middleware/validateClubProviderExistence'
import validateErrorsInSchema from '../../../../../../../middleware/validateErrosInSchema'
import { productsSchema } from '../../../../../schemas/productsSchema'
import { PRODUCTS_IMAGES_MAX_AMOUNT } from '..'
import { handleDeleteProduct, handleGetProduct, handlePutProduct } from '../../../../../../../controllers/products'

type CustomRequest = NextApiRequest & Request & {
    files: { location: string }[]
}

type CustomResponse = NextApiResponse & Response

const productRouter = createRouter<CustomRequest, CustomResponse>()

productRouter
    .use(upload.array('file', PRODUCTS_IMAGES_MAX_AMOUNT))
    .use(validateClubProviderExistence)
    .use(async (req, res, next) => (
        validateErrorsInSchema(req, res, next, productsSchema)
    )
    )
    .get(handleGetProduct)
    .put(handlePutProduct)
    .delete(handleDeleteProduct)

export default productRouter.handler({
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
