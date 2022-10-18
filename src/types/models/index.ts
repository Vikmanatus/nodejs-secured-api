import { AUTHORIZED_ROLES } from '../index';

export interface UsersSchema {
  username: string;
  hashed_password: string;
  salt: string;
  role: { type: AUTHORIZED_ROLES; default: AUTHORIZED_ROLES };
}
