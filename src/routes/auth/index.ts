import { permissionConfig } from '@/config';
import { TypedResponse } from '@/types';
import express, { Request } from 'express';
const authRouter = express.Router();

authRouter.get(permissionConfig.authRoot.url, (_req: Request, res: TypedResponse) => {
  return res.status(200).json({ message: 'Hello from Auth API', success: true });
});

export default authRouter;
