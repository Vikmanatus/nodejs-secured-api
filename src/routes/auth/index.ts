import { permissionConfig } from '@/config';
import {
  AuthorizationRequestPayload,
  AuthorizationRequestResponse,
  BasicJsonResponse,
  TypedRequestBody,
  TypedResponse,
} from '@/types';
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
  (req: TypedRequestBody<AuthorizationRequestPayload>, res: TypedResponse<AuthorizationRequestResponse>) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Invalide body request', success: false });
    }
    return res.status(201).json({
      message: 'Successfully fetched token',
      success: true,
      data: { token: 'Secret token' },
    });
  },
);
export default authRouter;
