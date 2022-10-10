import 'module-alias/register';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import { authRouter } from '@/routes';
import { ROUTER_ENDPOINTS } from '@/types';
import { permissionConfig } from './config';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ROUTER_ENDPOINTS.AUTH, authRouter);

app.get(permissionConfig.home.url, (_req: Request, res: Response) => {
  return res.status(200).json({ message: 'Welcolme to nodejs-secured-api', success: true });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    msg: 'Page not founded',
  });
});

export default app;
