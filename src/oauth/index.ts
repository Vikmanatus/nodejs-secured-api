import { ClientModelInstance } from '@/models/clients.models';
import { TokenModelInstance } from '@/models/token.models';
import { UsersModelInstance } from '@/models/users.models';
import { ClientsSchema, DbSearchResultType, GRANTS_AUTHORIZED_VALUES, OauthFunctionsModel, TokenSchema, UsersSchema } from '@/types/models';
import mongoose from 'mongoose';
import { Falsey } from 'oauth2-server';

export const oauthModel: OauthFunctionsModel = {
  getAccessToken(accessToken:string): Promise<Falsey | DbSearchResultType<TokenSchema>> {
    console.log('INSIDE ACCESSTOKEN FUNC');
    return new Promise((resolve, reject) => {
      TokenModelInstance.findOne({ accessToken })
        .then((result) => {
          resolve(result);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },
  getClient(clientId: string, clientSecret: string): Promise<Falsey | DbSearchResultType<ClientsSchema>> {
    console.log('INSIDE getClient FUNC');
    return new Promise((resolve, reject) => {
      ClientModelInstance.findOne({ clientId, clientSecret })
        .then((result) => {
          resolve(result);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },
  saveToken(
    token: TokenSchema,
    client: ClientsSchema,
    user: UsersSchema,
  ): Promise<Falsey | DbSearchResultType<TokenSchema>> {
    console.log('INSIDE saveToken FUNC');
    token.client = {
      id: client.clientId,
      grants: client.grants as GRANTS_AUTHORIZED_VALUES[],
    };

    token.user = {
      username: user.username,
      role: user.role,
    };
    return new Promise((resolve, reject) => {
      const tokenInstance = new TokenModelInstance<TokenSchema>(token);
      tokenInstance
        .save()
        .then((result) => {
          resolve(result);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },
  getUser(username: string, _password: string): Promise<Falsey | DbSearchResultType<UsersSchema>> {
    console.log('INSIDE getUser FUNC');
    return new Promise((resolve, reject) => {
      UsersModelInstance.findOne({ username })
        .then((result) => {
          resolve(result);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },
  getUserFromClient(client: ClientsSchema): Promise<Falsey | DbSearchResultType<ClientsSchema>> {
    console.log('INSIDE getUserFromClient FUNC');

    return new Promise((resolve, reject) => {
      ClientModelInstance.findOne({
        clientId: client.clientId,
        clientSecret: client.clientSecret,
        grants: GRANTS_AUTHORIZED_VALUES.CLIENT_CREDENTIALS,
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },
  getRefreshToken(refreshToken: string): Promise<Falsey | DbSearchResultType<TokenSchema>> {
    console.log('INSIDE getRefreshToken FUNC');

    return new Promise((resolve, reject) => {
      TokenModelInstance.findOne({ refreshToken: refreshToken })
        .then((result: DbSearchResultType<TokenSchema>) => {
          resolve(result);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },
  revokeToken(token: TokenSchema): Promise<boolean> {
    console.log('INSIDE revokeToken FUNC');

    return new Promise((resolve, reject) => {
      TokenModelInstance.deleteOne({ refreshToken: token.refreshToken })
        .then((result) => {
          console.log({ result });
          resolve(true);
        })
        .catch((err: mongoose.CallbackError) => {
          reject(err);
        });
    });
  },

  verifyScope(_token: TokenSchema, _scope: string | string[]): Promise<boolean> {
    console.log('INSIDE verifyScope FUNC');

    return Promise.resolve(true);
  },
};
