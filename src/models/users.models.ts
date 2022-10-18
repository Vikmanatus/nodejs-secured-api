import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';

import { UsersSchema } from '@/types/models';

const modelName = 'users';
export const UsersSchemaDef = {
  username: String,
  hashed_password: String,
  salt: String,
  role: { type: AUTHORIZED_ROLES, default: AUTHORIZED_ROLES.USER },
};
export const UserSchemaInstance = new mongoose.Schema<UsersSchema>(UsersSchemaDef);
export const UsersmodelInstance = mongoose.model<UsersSchema>(modelName, UserSchemaInstance);

// schemaInstance.virtual("password").set((password:string)=>{
//     this.test =""
// })

// schemaInstance.methods = {
//     authenticate: (plaintext:string, salt:string,hashed_password){

//     }
// }
