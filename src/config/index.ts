import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
