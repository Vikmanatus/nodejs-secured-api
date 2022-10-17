import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';
import crypto from 'crypto-js';
export const UsersSchema = {
  username: String,
  hashed_password: String,
  salt: String,
  role: { type: AUTHORIZED_ROLES, default: AUTHORIZED_ROLES },
};
const modelName = "users"
const schemaDefinition = UsersSchema;
const schemaInstance = new mongoose.Schema(schemaDefinition);
const modelInstance = mongoose.model(modelName, schemaInstance);

// schemaInstance.virtual("password").set((password:string)=>{
//     this.test =""
// })

// schemaInstance.methods = {
//     authenticate: (plaintext:string, salt:string,hashed_password){

//     }
// }