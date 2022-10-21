import mongoose from 'mongoose';
import OAuth2Server, { Falsey } from 'oauth2-server';
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

export type DbSearchResultType<T> = (mongoose.Document<unknown, unknown, T> & T & {
  _id: mongoose.Types.ObjectId;
}) | null

export type OauthFunctionsModel = {
  getAccessToken: (accessToken: string) => Promise<Falsey | DbSearchResultType<TokenSchema>>;
  getClient: (clientId: string, clientSecret: string) => Promise<OAuth2Server.Falsey | OAuth2Server.Client>;
  saveToken: (
    token: TokenSchema,
    client: ClientsSchema,
    user: UsersSchema,
  ) => Promise<Falsey | DbSearchResultType<TokenSchema>>;
  getUser: (username: string, password: string) => Promise<Falsey | DbSearchResultType<UsersSchema>>;
  getUserFromClient: (client: ClientsSchema) => Promise<Falsey | DbSearchResultType<ClientsSchema>>;
  getRefreshToken: (refreshToken: string) => Promise<Falsey | DbSearchResultType<TokenSchema>>;
  revokeToken: (token: TokenSchema) => Promise<boolean>;
  verifyScope(token: TokenSchema, scope: string | string[]): Promise<boolean>;
};