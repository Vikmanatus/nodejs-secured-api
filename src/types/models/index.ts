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
  AUTH_CODE = 'authorization_code',
}

export interface ClientsSchema {
  id: string;
  clientId: string;
  clientSecret: string;
  grants: GRANTS_AUTHORIZED_VALUES[];
  redirectUris: string[];
}

export interface AuthorizationCodeSchema {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope?: string[];
  client: TokenClientInfo;
  user: TokenUserInfo;
}
export interface TokenUserInfo {
  username: string;
  role: AUTHORIZED_ROLES[];
}
export interface TokenClientInfo {
  id: string;
  grants: GRANTS_AUTHORIZED_VALUES[];
}
export interface TokenSchema {
  accessToken: string;
  accessTokenExpiresAt: Date;
  refreshToken: string;
  refreshTokenExpiresAt: Date;
  scope?: string[];
  client: TokenClientInfo;
  user: TokenUserInfo;
}

export type DbSearchResultType<T> =
  | (mongoose.Document<unknown, unknown, T> &
      T & {
        _id: mongoose.Types.ObjectId;
      })
  | null;

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
