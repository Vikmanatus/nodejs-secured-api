import mongoose from 'mongoose';

export const TokenSchema = {
  accessToken: String,
  accessTokenExpiresAt: Date,
  refreshToken: String,
  refreshTokenExpiresAt: Date,
  client: Object,
  user: Object,
};
const modelName = 'token';
const schemaDefinition = TokenSchema;
const tokenSchemaInstance = new mongoose.Schema(schemaDefinition);

tokenSchemaInstance.index({ refreshTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const tokenModelInstance = mongoose.model(modelName, tokenSchemaInstance);
