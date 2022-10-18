import { AUTHORIZED_ROLES } from '@/types';
import mongoose from 'mongoose';

import { UsersSchema } from '@/types/models';

const modelName = 'users';

const schemaInstance = new mongoose.Schema<UsersSchema>({
  username: { type: String, required: true },
  hashed_password: { type: String, required: true },
  salt: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: AUTHORIZED_ROLES,
  },
});
export const UsersmodelInstance = mongoose.model<UsersSchema>(modelName, schemaInstance);

// schemaInstance.virtual("password").set((password:string)=>{
//     this.test =""
// })

// schemaInstance.methods = {
//     authenticate: (plaintext:string, salt:string,hashed_password){

//     }
// }
