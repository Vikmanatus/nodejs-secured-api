import express from 'express';
const authRouter = express.Router();

authRouter.get('/', (_req, res) => {
  res.status(200).send({ message: 'Hello from Auth API endpoint', success: true });
});

export default authRouter;
