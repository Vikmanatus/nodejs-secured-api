import { AUTHORIZED_ENDPOINTS, AUTHORIZED_ROLES, MATCH_ENDPOINTS, PermissionConfigType } from '@/types';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

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
    matchUrl: MATCH_ENDPOINTS.MATCH_API_ROOT_ENDPOINT,
  },
};
export const POSTMAN_PROJECT_NAME="nodejs-secured-api"

export const postmanConfig = {

}