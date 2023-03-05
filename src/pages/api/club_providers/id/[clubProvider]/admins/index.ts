import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter } from 'next-connect'
import { adminRegisterSchema } from '../../../../schemas/adminSchema'
import validateErrorsInSchema from '../../../../../../middleware/validateErrosInSchema'
import { upload } from '../../../../../../configs/S3Config'
import validateClubProviderExistence from '../../../../../../middleware/validateClubProviderExistence'
import { handleDeleteAdmins, handleGetAdmins, handlePostAdmins } from '../../../../../../controllers/admins'

type CustomRequest = NextApiRequest & Request & {
  file: { location: string }
}

type CustomResponse = NextApiResponse & Response

const adminsRouter = createRouter<CustomRequest, CustomResponse>();

adminsRouter
  .use(upload.single('file'))
  .use(validateClubProviderExistence)
  .use(async (req, res, next) => (
    validateErrorsInSchema(req, res, next, adminRegisterSchema)
  ))
  .get(handleGetAdmins)
  .post(handlePostAdmins)
  .delete(handleDeleteAdmins)

export default adminsRouter.handler({
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
