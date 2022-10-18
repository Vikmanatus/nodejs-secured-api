import { AUTHORIZED_ROLES } from '@/types';
import { ClientsSchema, ClientsSchemaDefinition } from '@/types/models';
import mongoose from 'mongoose';

const modelName = 'clients';
export const ClientSchemaDef: ClientsSchemaDefinition = {
  id: String,
  clientId: String,
  clientSecret: String,
  grants: { type: Object.values(AUTHORIZED_ROLES), required: Boolean },
  redirectUris: [String],
};
export const ClientSchemaInstance = new mongoose.Schema<ClientsSchema>(ClientSchemaDef);
export const ClientModelInstance = mongoose.model<ClientsSchema>(modelName, ClientSchemaInstance);
