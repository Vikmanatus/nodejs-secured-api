import { AUTHORIZED_ROLES } from '@/types';
import { ClientsSchema, ClientsSchemaDefinition, GRANTS_AUTHORIZED_VALUES } from '@/types/models';
import mongoose from 'mongoose';

const modelName = 'clients';
export const ClientSchemaDef: ClientsSchemaDefinition = {
  id: String,
  clientId: String,
  clientSecret: String,
  grants: { type: Object.values(GRANTS_AUTHORIZED_VALUES), required: true },
  redirectUris: [String],
};
export const ClientSchemaInstance = new mongoose.Schema<ClientsSchema>(ClientSchemaDef);
export const ClientModelInstance = mongoose.model<ClientsSchema>(modelName, ClientSchemaInstance);
