import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter, expressWrapper } from 'next-connect'
import cors from 'cors'
import { adminRegisterSchema } from '../../../../schemas/adminSchema'
import validateErrorsInSchema from '../../../../../../middleware/validateErrosInSchema'
import { upload } from '../../../../../../configs/S3Config'
import validateClubProviderExistence from '../../../../../../middleware/validateClubProviderExistence'
import { handleDeleteAdmins, handleGetAdmins, handlePostAdmins } from '../../../../../../controllers/admins'

type CustomRequest = NextApiRequest & Request & {
  files: { location: string }[]
  file: { location: string }
}

type CustomResponse = NextApiResponse & Response

const plansRouter = createRouter<CustomRequest, CustomResponse>();

plansRouter
  .use(expressWrapper(cors()))
  .use(upload.single('file'))
  .use(validateClubProviderExistence)
  .use(async (req, res, next) => (
    validateErrorsInSchema(req, res, next, adminRegisterSchema)
  ))
  .get(handleGetAdmins)
  .post(handlePostAdmins)
  .delete(handleDeleteAdmins)

export default plansRouter.handler({
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
