import { UsersModelInstance } from '@/models/users.models';
import { DbSearchResultType, UsersSchema } from '@/types/models';
import mongoose from 'mongoose';

export const getUser = (username: string): Promise<mongoose.CallbackError | DbSearchResultType<UsersSchema>> => {
  return new Promise((resolve, reject) => {
    UsersModelInstance.findOne({ username })
      .then((result: DbSearchResultType<UsersSchema>) => {
        resolve(result);
      })
      .catch((err: mongoose.CallbackError) => {
        reject(err);
      });
  });
};
