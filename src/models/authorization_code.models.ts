import { AUTHORIZED_ROLES } from '@/types';
import { AuthorizationCodeSchema, GRANTS_AUTHORIZED_VALUES } from '@/types/models';
import mongoose from 'mongoose';

const modelName = 'authorization_code';

export const AuthorizationCodeSchemaInstance = new mongoose.Schema<AuthorizationCodeSchema>({
  authorizationCode: { type: String, required: true },
  expiresAt: { type: Date },
  redirectUri: { type: String },
  scope: [{ type: String }],
  client: { id: { type: String }, grants: [{ type: String, enum: Object.values(GRANTS_AUTHORIZED_VALUES) }] },
  user: { username: { type: String }, role: [{ type: String, enum: Object.values(AUTHORIZED_ROLES) }] },
});
export const AuthorizationCodeModelInstance = mongoose.model<AuthorizationCodeSchema>(modelName, AuthorizationCodeSchemaInstance);
