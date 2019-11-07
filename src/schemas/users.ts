import mongoose, { Schema } from 'mongoose';
import { userType } from '../models/user.type';

const UserSchema: Schema = new Schema({
    name: String,
    email: { type: String, required: false, default: "admin@demo.com" },
    username: String,
    password: String
});

export default mongoose.model<userType>('users', UserSchema);