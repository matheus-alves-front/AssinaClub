import { PutObjectCommand } from "@aws-sdk/client-s3"
import { Request, Response } from "express-serve-static-core"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { s3, upload } from "../configs/S3Config"

type CustomRequest = NextApiRequest & Request<any> & {
    file: {
        key: string
        location: string
    }
}
type CustomResponse = NextApiResponse & Response<any>

export default async function handleFileUpload(
    request: NextApiRequest,
    response: NextApiResponse
) {

    const req = request as CustomRequest
    const res = response as CustomResponse

    upload.single('file')(req, res, (err) => {

        if (err) console.error(`Error uploading file: ${err}`)

        const { file } = req as any //! PROBLEMA AQUI 

        console.log(file)
    })
} 
