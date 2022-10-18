import { TokenSchema, TokenSchemaDefinition } from '@/types/models';
import mongoose from 'mongoose';
import { ClientSchemaDef } from './clients.models';
import { UsersSchemaDef } from './users.models';

const modelName = 'token';

export const TokenSchemaDef: TokenSchemaDefinition = {
  accessToken: String,
  accessTokenExpiresAt: Date,
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  client: { id: String },
  user: { id: String },
};

export const TokenSchemaInstance = new mongoose.Schema<TokenSchema>(TokenSchemaDef);

TokenSchemaInstance.index({ refreshTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const TokenModelInstance = mongoose.model<TokenSchema>(modelName, TokenSchemaInstance);
