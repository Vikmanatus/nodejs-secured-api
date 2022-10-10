import express from 'express';
import morgan from 'morgan';
import { PORT } from './config';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcolme to nodejs-secured-api', success: true });
});


console.log({PORT});
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    msg: 'Page not founded',
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});