import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"

export default function validateBody(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
) {
    if (!!req?.body?.body) {
        req.body = JSON.parse(req.body.body)
    }
    next()
}