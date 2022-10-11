import 'module-alias/register';
import express, { Request } from 'express';
import morgan from 'morgan';
import { authRouter } from '@/routes';
import { TypedResponse, ROUTER_ENDPOINTS } from '@/types';
import { permissionConfig } from './config';

/**
 * Global express application
 */
const app = express();

/**
 * Used to display information about incoming HTTP requests in the terminal
 */
app.use(morgan('dev'));

/**
 * Authorizing parsing of JSON body and URL encoded requests
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * The different other endpoints used in our API
 */
app.use(ROUTER_ENDPOINTS.AUTH, authRouter);

/**
 * Root API home
 */
app.get(permissionConfig.home.url, (_req: Request, res: TypedResponse) => {
  return res.status(200).json({ message: 'Welcolme to nodejs-secured-api', success: true });
});

/**
 * Used to redirect user's in case of unexisting URL
 */
app.use((_req, res: TypedResponse) => {
  res.status(404).json({
    message: 'Page not founded',
    success: false,
  });
});

export default app;
