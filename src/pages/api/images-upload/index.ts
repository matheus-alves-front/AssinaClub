import { NextApiRequest, NextApiResponse } from "next"
import handleFileUpload from "../../../middlewares/handleFIleUpload"

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handleImages(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req

    if (method === "POST") {
        try {
            await handleFileUpload(req, res)
            return res.status(201).json({
                message: "File uploaded successfully"
            })
        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: "File was not uploaded successfully"
            })
        }
    }
    else {
        return res.status(405).json({
            message: "method not allowed"
        })
    }
}