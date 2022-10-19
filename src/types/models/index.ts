import { AUTHORIZED_ROLES } from '../index';

export interface UsersSchema {
  username: string;
  hashed_password: string;
  salt?: string;
  role: AUTHORIZED_ROLES[];
}
export enum GRANTS_AUTHORIZED_VALUES {
  PASSWORD="password",
  CLIENT_CREDENTIALS = "client_credentials",
  REFRESH_TOKEN="refresh_token"
}

export interface UsersSchemaDefinition {
  username: StringConstructor;
  hashed_password: StringConstructor;
  salt: StringConstructor;
  role: AUTHORIZED_ROLES[];
}

export interface ClientsSchema {
  id?: string;
  clientId: string;
  clientSecret: string;
  grants: GRANTS_AUTHORIZED_VALUES;
  redirectUris: string[];
}

export interface ClientsSchemaDefinition {
  id: StringConstructor;
  clientId: StringConstructor;
  clientSecret: StringConstructor;
  grants:GRANTS_AUTHORIZED_VALUES[];
  redirectUris: StringConstructor[];
}
export interface TokenSchema {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  client: { id: string };
  user: { id: string };
}

export interface UserTokenInfo {
  username: string;
  role: AUTHORIZED_ROLES[];
}

export interface ClientTokenInfo {
  clientId: string;
}

export interface TokenSchemaDefinition {
  accessToken: StringConstructor;
  accessTokenExpiresAt: DateConstructor;
  refreshToken: StringConstructor;
  refreshTokenExpiresAt: DateConstructor;
  client: { id: StringConstructor };
  user: { id: StringConstructor };
}
