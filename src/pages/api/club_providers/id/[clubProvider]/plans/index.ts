import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter, expressWrapper } from 'next-connect'
import cors from 'cors'
import { Request, Response } from "express-serve-static-core"
import validateClubProviderExistence from '../../../../../../middleware/validateClubProviderExistence'
import { upload } from '../../../../../../configs/S3Config'
import { handleGetPlans, handlePostPlans } from '../../../../../../controllers/plans'
import validateErrorsInSchema from '../../../../../../middleware/validateErrosInSchema'
import { planRegisterSchema } from '../../../../schemas/planSchema'

type CustomRequest = NextApiRequest & Request & {
  files: { location: string }[]
}

type CustomResponse = NextApiResponse & Response

const plansRouter = createRouter<CustomRequest, CustomResponse>();

plansRouter
  .use(expressWrapper(cors()))
  .use(upload.array('file', 2))
  .use(async (req, res, next) => (
    validateErrorsInSchema(req, res, next, planRegisterSchema)
  )
  )
  .use(validateClubProviderExistence)
  .get(handleGetPlans)
  .post(handlePostPlans)

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
