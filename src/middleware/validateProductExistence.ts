import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { getProduct } from "../prisma/products"

export async function validateProductExistence(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) {
    const product = await getProduct(req.query.productId as string)

    if (!product) {
        return res.status(404).json({
            message: "Product not found!"
        })
    }
    
    next()
}