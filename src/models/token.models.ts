import { AUTHORIZED_ROLES } from '@/types';
import { GRANTS_AUTHORIZED_VALUES, TokenSchema } from '@/types/models';
import mongoose from 'mongoose';

const modelName = 'token';

export const TokenSchemaInstance = new mongoose.Schema<TokenSchema>({
  accessToken: { type: String },
  accessTokenExpiresAt: { type: Date },
  refreshToken: { type: String },
  refreshTokenExpiresAt: { type: Date },
  client: { id: { type: String }, grants: [{ type: String, enum: Object.values(GRANTS_AUTHORIZED_VALUES) }] },
  user: { username: { type: String }, role: [{ type: String, enum: Object.values(AUTHORIZED_ROLES) }] },
});

TokenSchemaInstance.index({ refreshTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const TokenModelInstance = mongoose.model<TokenSchema>(modelName, TokenSchemaInstance);
