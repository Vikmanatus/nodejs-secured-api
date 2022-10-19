import { AUTHORIZED_ROLES } from '../index';

export interface UsersSchema {
  username: string;
  hashed_password: string;
  salt?: string;
  role: AUTHORIZED_ROLES[];
}
export enum GRANTS_AUTHORIZED_VALUES {
  PASSWORD = 'password',
  CLIENT_CREDENTIALS = 'client_credentials',
  REFRESH_TOKEN = 'refresh_token',
}

export interface ClientsSchema {
  id: string;
  clientId: string;
  clientSecret: string;
  grants: GRANTS_AUTHORIZED_VALUES[];
  redirectUris: string[];
}

export interface TokenSchema {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  client: { id: string; grants: GRANTS_AUTHORIZED_VALUES[] };
  user: { username: string; role: AUTHORIZED_ROLES[] };
}
