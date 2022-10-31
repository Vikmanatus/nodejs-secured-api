import { oauth } from '@/config';
import { AuthorizationRequestResponse, GenericApiError, TypedResponse } from '@/types';
import { NextFunction, Request, Response } from 'express';
import OAuth2Server, { AuthenticateOptions } from 'oauth2-server';

export const obtainToken = (req: Request, res: TypedResponse<AuthorizationRequestResponse | GenericApiError>) => {
  console.log('inside middleware');
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  return oauth
    .token(request, response)
    .then((result) => {
      console.log({ result });
      return res.status(201).json({
        message: 'Successfully fetched token',
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      console.log('Error obtaining token');
      console.log({ err });
      return res.status(500).json({
        message: 'An error occured',
        success: false,
        error: err,
      });
    });
};

export const authenticateRequest = (req: Request, res: Response, next: NextFunction) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  const authOptions:AuthenticateOptions = {scope: req.headers.scope || undefined}
  console.log({authOptions});
  return oauth
    .authenticate(request, response, authOptions)
    .then((result) => {
      console.log('Request successfully auth');
      console.log({ result });
      res.locals.oauth = { token: result };
      next();
    })
    .catch((err) => {
      console.log('Error obtaining token');
      console.log({ err });
      return res.status(500).json({
        message: 'An error occured',
        success: false,
        error: err,
      });
    });
};
