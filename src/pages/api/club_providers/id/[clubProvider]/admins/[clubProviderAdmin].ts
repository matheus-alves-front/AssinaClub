import type { NextApiRequest, NextApiResponse } from 'next'
import { Request, Response } from "express-serve-static-core"
import { createRouter, expressWrapper } from 'next-connect'
import cors from 'cors'
import { upload } from '../../../../../../configs/S3Config'
import validateClubProviderExistence from '../../../../../../middleware/validateClubProviderExistence'
import { handleDeleteAdmin, handleGetAdmin, handlePutAdmin } from '../../../../../../controllers/admins'
import validateAdminExistence from '../../../../../../middleware/valideteAdminExistence'
import { Admin } from '../../../../../../@types/AdminsClubProviderTypes'

type CustomRequest = NextApiRequest & Request & {
  file: {
    location: string
  }
  locals: {
    admin: Admin
  }
}

type CustomResponse = NextApiResponse & Response

const adminRouter = createRouter<CustomRequest, CustomResponse>();

adminRouter
  .use(expressWrapper(cors()))
  .use(upload.single('file'))
  .use(validateClubProviderExistence)
  .use(validateAdminExistence)
  .get(handleGetAdmin)
  .put(handlePutAdmin)
  .delete(handleDeleteAdmin)

export default adminRouter.handler({
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
