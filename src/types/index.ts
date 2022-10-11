import { Response } from 'express';

/**
 * This enum represents the different API endpoints decorators passes to express in app.ts file
 */
export enum ROUTER_ENDPOINTS {
  AUTH = '/api/auth',
}

/**
 * This enum represents the different roles allowed for our role-authentification system
 */
export enum AUTHORIZED_ROLES {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super-admin',
}

/**
 * The endpoints passed to Express router function
 */
export enum AUTHORIZED_ENDPOINTS {
  API_ROOT_ENDPOINT = '/',
  SIGNUP_ENDPOINT = '/signup',
  AUTHORIZATION_ENDPOINT = '/oauth/token',
}

/**
 * Thses URL's used to check if the user is allowed to access specific endpoint, they can also be useful to create the URL's
 * in our automated postman config file and be passed into Jest function's
 */
export enum MATCH_ENDPOINTS {
  MATCH_API_ROOT_ENDPOINT = AUTHORIZED_ENDPOINTS.API_ROOT_ENDPOINT,
  MATCH_SIGNUP_ENDPOINT = ROUTER_ENDPOINTS.AUTH + AUTHORIZED_ENDPOINTS.SIGNUP_ENDPOINT,
  MATCH_AUTHORIZATION_ENDPOINT = ROUTER_ENDPOINTS.AUTH + AUTHORIZED_ENDPOINTS.AUTHORIZATION_ENDPOINT,
  MATCH_AUTH_ROOT_ENDPOINT = ROUTER_ENDPOINTS.AUTH,
}

/**
 * The different request types used
 */
export enum REQUEST_TYPES {
  POST = 'POST',
  PATCH = 'PATCH',
  GET = 'GET',
}

/**
 * This enum is used to configure automatically the postman collection file
 */
export enum POSTMAN_FORM_TYPES {
  RAW = 'raw',
  ENCODED = 'x-www-form-urlencoded',
  FILES = 'form-data',
  NONE = 'none',
}

/**
 * Type used to define what request types and which postman form type string is required for the automatic postman collection configuration
 */
export type PostmanRequestInformationType = { type: REQUEST_TYPES; postmanFormType: POSTMAN_FORM_TYPES,contentType?: CONTENT_TYPES; };

/**
 * This type defines the different values used in our permission config objects
 */
export type PermissionObjectType = {
  url: AUTHORIZED_ENDPOINTS;
  authorized_roles: AUTHORIZED_ROLES[];
  matchUrl: MATCH_ENDPOINTS;
};

/**
 * This type represents the definition of our config object used to :
 * - define the different roles who are allowed to access the route
 * - the URL
 * - the match URL
 */
export type PermissionConfigType = {
  home: PermissionObjectType;
  authorizationUrl: PermissionObjectType;
  authRoot: PermissionObjectType;
};

/**
 * This type represent aditionnal information required for our Postman collection file automatic configuration
 */
export type PostmanAddtionalConfigObjectType = {
  isAuthRequired: boolean;
  requestInformation: PostmanRequestInformationType;
  requestName: string;
};

/** 
 * Define the required information for each element of the PostmanConfigType
 */
export type PostmanObjectConfigType = PermissionObjectType & PostmanAddtionalConfigObjectType;

/**
 * This interface extends the original permission config type and add's the required addition information for Postman collection file automatic configuration
 */
export interface PostmanConfigType extends PermissionConfigType {
  home: PostmanObjectConfigType;
  authorizationUrl: PostmanObjectConfigType;
  authRoot: PostmanObjectConfigType;
}

/**
 * This interface represents the schema used in many requests where we don't need to send data
 */
export interface BasicJsonResponse {
  message: string;
  success: boolean;
}

/**
 * This type will be used to override the body defined in the Express json() method
 */
export type Send<T = Response> = (body?: BasicJsonResponse) => T;

/**
 * This interface is used to type the body of the arguments passed in the Express json() method
 * Source: https://stackoverflow.com/questions/62736335/typescript-and-express-js-change-res-json-response-type
 */
export interface TypedResponse extends Response {
  json: Send<this>;
}

/**
 * This enum represents the different content-type used for our Postman configuration file and our Jest test's
 */
export enum CONTENT_TYPES {
  JSON = 'application/json',
  FILES = 'multipart/form-data',
  URL_ENCODED = 'application/x-www-form-urlencoded',
  KEY = 'Content-Type',
}
