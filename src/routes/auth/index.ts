import { permissionConfig } from '@/config';
import express from 'express';
const authRouter = express.Router();

authRouter.get(permissionConfig.authRoot.url, (_req, res) => {
  return res.status(200).send({ message: 'Hello from Auth API qslknks', success: true });
});

export default authRouter;
