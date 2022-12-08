import { oauth, permissionConfig } from '@/config';
import { authenticateRequest, authorizeRequest } from '@/middlewares';
import { BasicJsonResponse, ExpressOauthRouter, TypedResponse } from '@/types';
import express, { Request } from 'express';

const authRouter = express.Router() as ExpressOauthRouter;
authRouter.oauth = oauth;

/**
 * Auth root endpoint
 */
authRouter.get(permissionConfig.authRoot.url, (_req: Request, res: TypedResponse<BasicJsonResponse>) => {
  return res.status(200).json({ message: 'Hello from Auth API', success: true });
});

/**
 * Route to request token
 */
authRouter.post(permissionConfig.authorizationUrl.url, authorizeRequest);

authRouter.get("/oauth/success",(_req,_res)=>{
  // res.redirect()
})
authRouter.get(
  permissionConfig.admin.url,
  authenticateRequest,
  (_req: Request, res: TypedResponse<BasicJsonResponse>) => {
    return res.status(200).json({
      message: 'You are an admin',
      success: true,
    });
  },
);
export default authRouter;
