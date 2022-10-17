import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';
export type ClientsSchemaType = {
  id: string;
  clientId: string;
  clientSecret: string;
  grants: AUTHORIZED_ROLES[];
  redirectUris: string[];
};
export const ClientsSchema = {
  id: String,
  clientId: String,
  clientSecret: String,
  grants: [AUTHORIZED_ROLES],
  redirectUris: [String],
};

const modelName = 'clients';
const schemaDefinition = ClientsSchema;
const schemaInstance = new mongoose.Schema(schemaDefinition);
export const ClientsmodelInstance = mongoose.model(modelName, schemaInstance);
