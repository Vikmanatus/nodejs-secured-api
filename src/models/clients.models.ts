import { ClientsSchema, GRANTS_AUTHORIZED_VALUES } from '@/types/models';
import mongoose from 'mongoose';

const modelName = 'clients';

export const ClientSchemaInstance = new mongoose.Schema<ClientsSchema>({
  id: { type: String },
  clientId: { type: String },
  clientSecret: { type: String },
  grants: [
    {
      type: String,
      enum: Object.values(GRANTS_AUTHORIZED_VALUES),
    },
  ],
  redirectUris: [{ type: String }],
});
export const ClientModelInstance = mongoose.model<ClientsSchema>(modelName, ClientSchemaInstance);
