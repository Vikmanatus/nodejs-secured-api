import { oauth } from '@/config';
import { AuthorizationRequestResponse, GenericApiError, TypedResponse } from '@/types';
import { UsersSchema } from '@/types/models';
import { getUser } from '@/utils/db';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
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
export const authorizeRequest = (req: Request, res: Response) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  // if(request.query){
  //   request.query.allowed = "true"
  // }
  console.log({ parmas: req.params });
  console.log({ query: req.query });
  return oauth
    .authorize(request, response, {
      allowEmptyState: true,
      authenticateHandler: {
        handle: function (request: OAuth2Server.Request, _response: OAuth2Server.Response) {
          console.log('inside handler');
          console.log({ username: request.query?.username });
          return getUser(request.query?.username || '')
            .then((result) => {
              console.log({ result });
              return result as UsersSchema;
            })
            .catch((_err: mongoose.CallbackError) => {
              console.log('error get user handler');
              return false;
            });
        },
      },
    })
    .then((result) => {
      console.log({ result_authorize: result });
      return res.status(201).json({
        message: 'Successfully fetched authorization code',
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      console.log('Error obtaining authorization code');
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
  const authOptions: AuthenticateOptions = { scope: req.headers.scope || undefined };
  console.log({ authOptions });
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
