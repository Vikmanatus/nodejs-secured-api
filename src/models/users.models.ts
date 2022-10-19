import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';

import { UsersSchema, UsersSchemaDefinition } from '@/types/models';

const modelName = 'users';

export const UsersSchemaDef: UsersSchemaDefinition = {
  username: String,
  role: [AUTHORIZED_ROLES.ADMIN, AUTHORIZED_ROLES.USER, AUTHORIZED_ROLES.SUPER_ADMIN],
  hashed_password: String,
  salt: String,
};

export const UserSchemaInstance = new mongoose.Schema<UsersSchema>(UsersSchemaDef);

export const UsersModelInstance = mongoose.model<UsersSchema>(modelName, UserSchemaInstance);
