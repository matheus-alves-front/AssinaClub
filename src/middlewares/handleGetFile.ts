import { Request, Response } from "express-serve-static-core"
import { NextApiRequest, NextApiResponse } from "next"
import { s3 } from "../configs/S3Config"

type CustomRequest = NextApiRequest & Request<any> & {
    file: {
        key: string
    }
}
type CustomResponse = NextApiResponse & Response<any>

export default async function handleGetFile(
    request: NextApiRequest,
    response: NextApiResponse
) {

    const req = request as CustomRequest
    const res = response as CustomResponse

    const { imageKey } = req.query

    try {

        const image = await s3.getObject({
            Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
            Key: String(imageKey)
        })        

        res.setHeader('Content-Type', 'image/png')
        res.send(image.Body)

    } catch (err) {
        console.error(`Error handling get file: ${err}`)
        return res.status(500).json({ error: err })
    }
}