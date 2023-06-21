import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

export default function validateLoginTypeOfUser(
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler,
) {
    if (!['clubProvider', 'admin', 'subscriber'].includes(req.body.typeOfUser)) {
        return res.status(400).json({
            message: "Invalid type of user"
        })
    }
    next()
}