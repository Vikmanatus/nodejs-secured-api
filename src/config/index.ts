import dotenv from 'dotenv';
import {
  AuthorizationRequestPayload,
  AUTHORIZED_ENDPOINTS,
  AUTHORIZED_ROLES,
  CONTENT_TYPES,
  MATCH_ENDPOINTS,
  PermissionConfigType,
  PostmanConfigType,
  POSTMAN_FORM_TYPES,
  REQUEST_TYPES,
  UploadMediaInterface,
} from '@/types';
import multer from 'multer';
import mongoose from 'mongoose';
import OAuth2Server, { Client, Falsey, Token } from 'oauth2-server';
import { TokenModelInstance } from '@/models/token.models';
import { ClientModelInstance } from '@/models/clients.models';

export const oauth = new OAuth2Server({
  model: {
    getAccessToken(accessToken, _callback): Promise<Token | Falsey> {
      return new Promise((resolve, reject) => {
        TokenModelInstance.findOne({ accessToken })
          .then((result) => {
            resolve(result as unknown as Token);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    getClient(clientId, clientSecret, callback) {
      return new Promise((resolve, reject) => {
        ClientModelInstance.findOne({ clientId, clientSecret })
          .then((result) => {
            resolve(result as unknown as Client);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    saveToken(token, client, user, callback) {

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
};

/**
 * Used in the automatic generated Postman collection file
 */
export const POSTMAN_PROJECT_NAME = 'nodejs-secured-api';

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
      postmanFormType: POSTMAN_FORM_TYPES.RAW,
      type: REQUEST_TYPES.POST,
      contentType: CONTENT_TYPES.JSON,
      data: {
        email: 'test@gmail.com',
        password: 'fake_pswd_from_config',
      } as AuthorizationRequestPayload,
    },
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
};
