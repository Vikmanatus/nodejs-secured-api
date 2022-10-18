import { AUTHORIZED_ROLES } from '../index';

export interface UsersSchema {
  username: string;
  hashed_password: string;
  salt: string;
  role: { type: AUTHORIZED_ROLES; default: AUTHORIZED_ROLES };
}

export interface UsersSchemaDefinition {
  username: StringConstructor;
  hashed_password: StringConstructor;
  salt: StringConstructor;
  role: { type: AUTHORIZED_ROLES[]; default: AUTHORIZED_ROLES };
}

export interface ClientsSchema {
  id: string;
  clientId: string;
  clientSecret: string;
  grants: { type: AUTHORIZED_ROLES; required: boolean };
  redirectUris: string[];
}

export interface ClientsSchemaDefinition {
  id: StringConstructor;
  clientId: StringConstructor;
  clientSecret: StringConstructor;
  grants: { type: AUTHORIZED_ROLES[]; required: BooleanConstructor };
  redirectUris: StringConstructor[];
}
export interface TokenSchema {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  client: ClientsSchema;
  user: UsersSchema;
}
