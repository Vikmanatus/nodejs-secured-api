import { permissionConfig } from '@/config';
import { BasicJsonResponse, TypedResponse } from '@/types';
import express, { Request } from 'express';
const mediasRouter = express.Router();

mediasRouter.post(permissionConfig.uploadMedias.url, (_req: Request, res: TypedResponse<BasicJsonResponse>) => {
  return res.status(201).json({ message: 'Successfully uploaded picture', success: true });
});
export default mediasRouter;
