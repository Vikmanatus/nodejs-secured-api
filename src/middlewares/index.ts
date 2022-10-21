import { oauth } from '@/config';
import { AuthorizationRequestResponse, GenericApiError, TypedResponse } from '@/types';
import { NextFunction, Request, Response } from 'express';
import { OAuth2Server } from 'oauth2-server';

export const obtainToken = (req: Request, res: TypedResponse<AuthorizationRequestResponse|GenericApiError>, _next: NextFunction) => {
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
        message: 'Successfully fetched token',
        success: true,
        error: err,
      });
    });
};

export const authenticateRequest = (_req: Request, _res: Response, _next: NextFunction) => {};
