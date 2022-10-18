import { AUTHORIZED_ROLES } from '../index';

export interface UsersSchema {
  username: string;
  hashed_password: string;
  salt: string;
  role: { type: AUTHORIZED_ROLES; default: AUTHORIZED_ROLES.ADMIN };
}

export interface TokenSchema {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  client: ClientsSchemaType;
  user: UsersSchema;
}
export interface ClientsSchemaType {
  id: string;
  clientId: string;
  clientSecret: string;
  grants: AUTHORIZED_ROLES[];
  redirectUris: string[];
}
