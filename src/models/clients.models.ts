import { AUTHORIZED_ROLES } from '@/types';
import { ClientsSchema, ClientsSchemaDefinition, GRANTS_AUTHORIZED_VALUES } from '@/types/models';
import mongoose from 'mongoose';

const modelName = 'clients';
export const ClientSchemaDef: ClientsSchemaDefinition = {
  id: String,
  clientId: String,
  clientSecret: String,
  grants: [
    GRANTS_AUTHORIZED_VALUES.CLIENT_CREDENTIALS,
    GRANTS_AUTHORIZED_VALUES.PASSWORD,
    GRANTS_AUTHORIZED_VALUES.REFRESH_TOKEN,
  ],
  redirectUris: [String],
};
export const ClientSchemaInstance = new mongoose.Schema<ClientsSchema>(ClientSchemaDef);
export const ClientModelInstance = mongoose.model<ClientsSchema>(modelName, ClientSchemaInstance);
