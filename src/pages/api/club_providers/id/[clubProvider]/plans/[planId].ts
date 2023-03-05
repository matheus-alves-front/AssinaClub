import type { NextApiRequest, NextApiResponse } from 'next'
import { Plan } from '../../../../../../@types/PlansTypes'
import { createRouter, expressWrapper } from 'next-connect'
import cors from 'cors'
import { Request, Response } from "express-serve-static-core"
import validateClubProviderExistence from '../../../../../../middleware/validateClubProviderExistence'
import { upload } from '../../../../../../configs/S3Config'
import { handleDeletePlan, handleGetPlan, handlePutPlan } from '../../../../../../controllers/plans'

type CustomRequest = NextApiRequest & Request & {
  files: { location: string }[]
  locals?: {
    plan: Plan
  } 
}

type CustomResponse = NextApiResponse & Response

const plansRouter = createRouter<CustomRequest, CustomResponse>();

plansRouter
  .use(expressWrapper(cors()))
  .use(upload.array('file', 2))
  .use(validateClubProviderExistence)
  .get(handleGetPlan)
  .put(handlePutPlan)
  .delete(handleDeletePlan)

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
