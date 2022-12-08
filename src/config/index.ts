import dotenv from 'dotenv';
import {
  AuthorizationRequestPayload,
  AUTHORIZED_ENDPOINTS,
  AUTHORIZED_ROLES,
  CONTENT_TYPES,
  MATCH_ENDPOINTS,
  PermissionConfigType,
  PostmanConfigType,
  POSTMAN_EVENTS,
  POSTMAN_FORM_TYPES,
  POSTMAN_SCRIPT_TYPES,
  REQUEST_TYPES,
  UploadMediaInterface,
} from '@/types';
import multer from 'multer';
import mongoose from 'mongoose';
import OAuth2Server from 'oauth2-server';
import { ClientModelInstance } from '@/models/clients.models';
import { UsersModelInstance } from '@/models/users.models';
import { ClientsSchema, GRANTS_AUTHORIZED_VALUES, UsersSchema, AuthorizationCodeSchema } from '@/types/models';
import { oauthModel } from '@/oauth';
import { AuthorizationCodeModelInstance } from '@/models/authorization_code.models';

export const VALID_SCOPES = ['READ', 'WRITE'];
export const oauth = new OAuth2Server({
  accessTokenLifetime: 180,
  allowBearerTokensInQueryString: true,
  allowEmptyState:false,
  addAcceptedScopesHeader:true,
  addAuthorizedScopesHeader:true,
  authorizationCodeLifetime:60,
  alwaysIssueNewRefreshToken:true,
  model: {
    ...oauthModel,
    validateScope(user, client, scope: string) {
      // const formattedScope = scope.split(',')

      console.log('INSIDE VALIDATE SCOPE');
      console.log({ user });
      console.log({ client });
      console.log({ scope });
      // return Promise.resolve(scope);
      if (!scope || !scope.split(',').every((s) => VALID_SCOPES.indexOf(s) >= 0)) {
        return Promise.reject(false);
      }
      console.log('should resolve');
      return Promise.resolve(scope);
    },
    saveAuthorizationCode(code: AuthorizationCodeSchema, client: ClientsSchema, user: UsersSchema) {
      console.log('inside saveAuthorizationCode');
      code.client = {
        id: client.id,
        grants: client.grants as GRANTS_AUTHORIZED_VALUES[],
      };
      console.log({ user });
      code.user = {
        username: user.username,
        role: user.role,
      };
      return new Promise((resolve, reject) => {
        const authorizationCodeInstance = new AuthorizationCodeModelInstance<AuthorizationCodeSchema>(code);
        authorizationCodeInstance
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((err: mongoose.CallbackError) => {
            reject(err);
          });
      });
    },
    getAuthorizationCode(authorizationCode: string) {
      console.log('inside getAuthorizationCode');
      console.log({ authorizationCode });
      return new Promise((resolve, reject) => {
        AuthorizationCodeModelInstance.findOne({ authorizationCode })
          .then((result) => {
            console.log({ result });
            resolve(result);
          })
          .catch((err: mongoose.CallbackError) => {
            reject(err);
          });
      });
    },
    revokeAuthorizationCode(code) {
      console.log('inside revokeAuthorizationCode');

      return new Promise((resolve, reject) => {
        AuthorizationCodeModelInstance.deleteOne({ authorizationCode: code.authorizationCode })
          .then((result) => {
            console.log({ result });
            resolve(true);
          })
          .catch((err: mongoose.CallbackError) => {
            reject(err);
          });
      });
    },
  },
});

dotenv.config({
  path: '.env',
});

export const Multer = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export const DebugDatabaseUser: UsersSchema = {
  username: 'pedroetb',
  hashed_password: 'password',
  role: [AUTHORIZED_ROLES.USER],
};

export const DebugClient1: ClientsSchema = {
  id: 'application', // TODO: Needed by refresh_token grant, because there is a bug at line 103 in https://github.com/oauthjs/node-oauth2-server/blob/v3.0.1/lib/grant-types/refresh-token-grant-type.js (used client.id instead of client.clientId)
  clientId: 'application',
  clientSecret: 'secret',
  grants: [GRANTS_AUTHORIZED_VALUES.PASSWORD, GRANTS_AUTHORIZED_VALUES.REFRESH_TOKEN],
  redirectUris: [],
};
export const DebugClient2: ClientsSchema = {
  id: 'someId',
  clientId: 'confidentialApplication',
  clientSecret: 'topSecret',
  grants: [GRANTS_AUTHORIZED_VALUES.PASSWORD, GRANTS_AUTHORIZED_VALUES.CLIENT_CREDENTIALS],
  redirectUris: [],
};

export const generateOauthExampleData = () => {
  const client1 = new ClientModelInstance<ClientsSchema>(DebugClient1);
  const client2 = new ClientModelInstance<ClientsSchema>(DebugClient2);

  const user = new UsersModelInstance<UsersSchema>(DebugDatabaseUser);
  client1.save(function (err, client) {
    if (err) {
      return console.error(err);
    }
    console.log('Created client', client);
  });

  user.save(function (err, user) {
    if (err) {
      return console.error(err);
    }
    console.log('Created user', user);
  });

  client2.save(function (err, client) {
    if (err) {
      return console.error(err);
    }
    console.log('Created client', client);
  });
};

/**
 * Port used to launch our server
 */
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

export const API_URL: string = process.env.API_URL ? process.env.API_URL : `http://localhost:${PORT}`;

const DB_USER: string = process.env.DB_USER ? process.env.DB_USER : 'some_db_user';

const DB_NAME: string = process.env.DB_NAME ? process.env.DB_NAME : 'some_db_name';

const DB_PASSWORD: string = process.env.DB_PASSWORD ? process.env.DB_PASSWORD : 'some_db_password';

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.abyn0v1.mongodb.net/?retryWrites=true&w=majority`;

export const connectDb = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URL)
      .then((result) => {
        resolve('Database successfully connected: ' + result.connection.host);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
/**
 * This object is used to configure our project
 * We define the URL of the endpoint, the authroized roles and the match URL passed
 */
export const permissionConfig: PermissionConfigType = {
  home: {
    url: AUTHORIZED_ENDPOINTS.API_ROOT_ENDPOINT,
    authorized_roles: [AUTHORIZED_ROLES.USER, AUTHORIZED_ROLES.ADMIN, AUTHORIZED_ROLES.SUPER_ADMIN],
    matchUrl: MATCH_ENDPOINTS.MATCH_API_ROOT_ENDPOINT,
  },
  authorizationUrl: {
    url: AUTHORIZED_ENDPOINTS.AUTHORIZATION_ENDPOINT,
    authorized_roles: [AUTHORIZED_ROLES.USER, AUTHORIZED_ROLES.ADMIN, AUTHORIZED_ROLES.SUPER_ADMIN],
    matchUrl: MATCH_ENDPOINTS.MATCH_AUTHORIZATION_ENDPOINT,
  },
  authRoot: {
    url: AUTHORIZED_ENDPOINTS.API_ROOT_ENDPOINT,
    authorized_roles: [AUTHORIZED_ROLES.USER, AUTHORIZED_ROLES.ADMIN, AUTHORIZED_ROLES.SUPER_ADMIN],
    matchUrl: MATCH_ENDPOINTS.MATCH_AUTH_ROOT_ENDPOINT,
  },
  uploadMedias: {
    url: AUTHORIZED_ENDPOINTS.UPLOAD_MEDIAS_ENDPOINT,
    authorized_roles: [AUTHORIZED_ROLES.ADMIN, AUTHORIZED_ROLES.SUPER_ADMIN],
    matchUrl: MATCH_ENDPOINTS.MATCH_UPLOAD_MEDIAS_ENDPOINT,
  },
  admin: {
    url: AUTHORIZED_ENDPOINTS.ADMIN_TEST_ROUTE,
    authorized_roles: [AUTHORIZED_ROLES.ADMIN],
    matchUrl: MATCH_ENDPOINTS.MATCH_ADMIN_ROUTE_ENDPOINT,
  },
};

/**
 * Used in the automatic generated Postman collection file
 */
export const POSTMAN_PROJECT_NAME = 'nodejs-secured-api';

const POSTMAN_AUTH_REQUIRED_TEST = `
const response_body = pm.response.json();
pm.environment.name="NodeJs Secured API - ENV variables";
pm.environment.set("ACCESS_TOKEN", response_body.data.accessToken);
pm.environment.set("REFRESH_TOKEN",response_body.data.refreshToken);
`;

/**
 * The object used to manage the automatic configuration of our Postman collection file
 */
export const postmanConfig: PostmanConfigType = {
  home: {
    ...permissionConfig.home,
    isAuthRequired: false,
    requestInformation: { postmanFormType: POSTMAN_FORM_TYPES.NONE, type: REQUEST_TYPES.GET },
    requestName: 'Trigger local endpoint',
  },
  authorizationUrl: {
    ...permissionConfig.authorizationUrl,
    isAuthRequired: false,
    requestInformation: {
      postmanFormType: POSTMAN_FORM_TYPES.ENCODED,
      type: REQUEST_TYPES.POST,
      contentType: CONTENT_TYPES.URL_ENCODED,
      authorizationClientInfo: {
        clientId: DebugClient1.clientId,
        clientSecret: DebugClient1.clientSecret,
      },
      data: {
        username: DebugDatabaseUser.username,
        password: DebugDatabaseUser.hashed_password,
        grant_type: GRANTS_AUTHORIZED_VALUES.PASSWORD,
      } as AuthorizationRequestPayload,
    },
    event: [
      { listen: POSTMAN_EVENTS.TEST, script: { type: POSTMAN_SCRIPT_TYPES.JS, exec: [POSTMAN_AUTH_REQUIRED_TEST] } },
    ],
    requestName: 'Obtain token',
  },
  authRoot: {
    ...permissionConfig.authRoot,
    isAuthRequired: false,
    requestInformation: { postmanFormType: POSTMAN_FORM_TYPES.NONE, type: REQUEST_TYPES.GET },
    requestName: 'Trigger auth root endpoint',
  },
  uploadMedias: {
    ...permissionConfig.uploadMedias,
    isAuthRequired: false,
    requestInformation: {
      postmanFormType: POSTMAN_FORM_TYPES.FILES,
      type: REQUEST_TYPES.POST,
      contentType: CONTENT_TYPES.FILES,
      data: {
        requestKey: 'upload-file',
        relativeFilePath: '/images/saitama.jpeg',
      } as UploadMediaInterface,
    },
    requestName: 'Upload picture to Google Cloud Storage',
  },
  admin: {
    ...permissionConfig.admin,
    isAuthRequired: true,
    requestInformation: {
      postmanFormType: POSTMAN_FORM_TYPES.NONE,
      type: REQUEST_TYPES.GET,
    },
    requestName: 'Checking if Admin role is working',
  },
};
