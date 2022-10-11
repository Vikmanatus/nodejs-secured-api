import { permissionConfig } from '@/config';
import { AuthorizationRequestResponse, BasicJsonResponse, TypedResponse } from '@/types';
import express, { Request } from 'express';
const authRouter = express.Router();

/**
 * Auth root endpoint
 */
authRouter.get(permissionConfig.authRoot.url, (_req: Request, res: TypedResponse<BasicJsonResponse>) => {
  return res.status(200).json({ message: 'Hello from Auth API', success: true });
});

/**
 * Route to request token
 */
authRouter.post(
  permissionConfig.authorizationUrl.url,
  (req: Request, res: TypedResponse<AuthorizationRequestResponse>) => {
    return res
      .status(201)
      .json({
        message: 'Successfully fetched token',
        success: true,
        data: { email: req.body.email, password: req.body.password },
      });
  },
);
export default authRouter;
