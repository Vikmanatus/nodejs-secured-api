import 'module-alias/register';
import express from 'express';
import morgan from 'morgan';
import { PORT } from '@/config';
import { authRouter } from './routes';
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcolme to nodejs-secured-api', success: true });
});

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    msg: 'Page not founded',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
