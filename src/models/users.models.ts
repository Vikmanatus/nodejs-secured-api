import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';

import { UsersSchema, UsersSchemaDefinition } from '@/types/models';

const modelName = 'users';

export const UsersSchemaDef: UsersSchemaDefinition = {
  username: String,
  role: { type: Object.values(AUTHORIZED_ROLES), default: AUTHORIZED_ROLES.SUPER_ADMIN },
  hashed_password: String,
  salt: String,
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
