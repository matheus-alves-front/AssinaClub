import { NextApiRequest, NextApiResponse } from "next"
import handleGetFile from "../../../../middlewares/handleGetFile"

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handleImage(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    if (method === "GET") {
        await handleGetFile(req, res)
    }
    else {
        return res.status(405).json({
            message: "method not allowed"
        })
    }
}