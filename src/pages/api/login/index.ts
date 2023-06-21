import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect';
import validateLoginTypeOfUser from '../../../middleware/validateLoginTypeOfUser';
import handleLogin from '../../../controllers/login';

const loginRouter = createRouter<NextApiRequest, NextApiResponse>();

loginRouter
    .use(validateLoginTypeOfUser)
    .post(handleLogin)


export default loginRouter.handler({
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