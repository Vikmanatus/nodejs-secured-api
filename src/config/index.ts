import dotenv from 'dotenv';
import {
  AUTHORIZED_ENDPOINTS,
  AUTHORIZED_ROLES,
  MATCH_ENDPOINTS,
  PermissionConfigType,
  PostmanConfigType,
  POSTMAN_FORM_TYPES,
  REQUEST_TYPES,
} from '@/types';

dotenv.config({
  path: '.env',
});

/**
 * Port used to launch our server
 */
export const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

export const API_URL: string = process.env.API_URL ? process.env.API_URL : `http://localhost:${PORT}`

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
    requestInformation: { postmanFormType: POSTMAN_FORM_TYPES.RAW, type: REQUEST_TYPES.POST },
    requestName: 'Obtain token',
  },
  authRoot: {
    ...permissionConfig.authRoot,
    isAuthRequired: false,
    requestInformation: { postmanFormType: POSTMAN_FORM_TYPES.NONE, type: REQUEST_TYPES.GET },
    requestName: 'Trigger auth root endpoint',
  },
};
