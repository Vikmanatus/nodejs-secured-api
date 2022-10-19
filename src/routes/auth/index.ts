import { oauth, obtainToken, permissionConfig } from '@/config';
import {
  AuthorizationRequestPayload,
  AuthorizationRequestResponse,
  BasicJsonResponse,
  ExpressOauthRouter,
  TypedRequestBody,
  TypedResponse,
} from '@/types';
import express, { Request, Router } from 'express';
import OAuth2Server from 'oauth2-server';

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
authRouter.post(
  permissionConfig.authorizationUrl.url,
  obtainToken,
  (req: TypedRequestBody<AuthorizationRequestPayload>, res: TypedResponse<AuthorizationRequestResponse>) => {
    console.log('Inside request');
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
