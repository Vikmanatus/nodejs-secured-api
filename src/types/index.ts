export enum ROUTER_ENDPOINTS {
  AUTH = '/api/auth',
}
export enum AUTHORIZED_ROLES {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
}

export enum AUTHORIZED_ENDPOINTS {
  API_ROOT_ENDPOINT = '/',
  SIGNUP_ENDPOINT = '/signup',
  AUTHORIZATION_ENDPOINT = '/oauth/token',
}

export enum MATCH_ENDPOINTS {
  MATCH_API_ROOT_ENDPOINT = AUTHORIZED_ENDPOINTS.API_ROOT_ENDPOINT,
  MATCH_SIGNUP_ENDPOINT = ROUTER_ENDPOINTS.AUTH + AUTHORIZED_ENDPOINTS.SIGNUP_ENDPOINT,
  MATCH_AUTHORIZATION_ENDPOINT = ROUTER_ENDPOINTS.AUTH + AUTHORIZED_ENDPOINTS.AUTHORIZATION_ENDPOINT,
  MATCH_AUTH_ROOT_ENDPOINT= ROUTER_ENDPOINTS.AUTH
}

export type PermissionObjectType = {
  url: AUTHORIZED_ENDPOINTS;
  authorized_roles: AUTHORIZED_ROLES[];
  matchUrl: MATCH_ENDPOINTS;
};
export type PermissionConfigType = {
  home: PermissionObjectType;
  authorizationUrl: PermissionObjectType;
  authRoot: PermissionObjectType
};

