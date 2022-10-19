import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';

import { UsersSchema } from '@/types/models';

const modelName = 'users';

export const UserSchemaInstance = new mongoose.Schema<UsersSchema>({
  username: { type: String },
  hashed_password: { type: String },
  role: [
    {
      type: String,
      enum: Object.values(AUTHORIZED_ROLES),
    },
  ],
  salt: { type: String },
});

export const UsersModelInstance = mongoose.model<UsersSchema>(modelName, UserSchemaInstance);
