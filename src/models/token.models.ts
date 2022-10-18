import { TokenSchema } from '@/types/models';
import mongoose from 'mongoose';
import { ClientsSchema } from './clients.models';
import { UserSchemaInstance } from './users.models';

const modelName = 'token';

const tokenSchemaInstance = new mongoose.Schema<TokenSchema>({
  accessToken: { type: String, required: true },
  accessTokenExpiresAt: { type: Date, required: true },
  refreshToken: { type: String, required: true },
  refreshTokenExpiresAt: { type: Date, required: true },
  client: { type: ClientsSchema, required: true },
  user: { type: UserSchemaInstance, required: true },
});

tokenSchemaInstance.index({ refreshTokenExpiresAt: 1 }, { expireAfterSeconds: 0 });

export const tokenModelInstance = mongoose.model(modelName, tokenSchemaInstance);
