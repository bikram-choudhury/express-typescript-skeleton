import mongoose, { Document } from 'mongoose';
export interface userType extends Document {
  name: string;
  email?: string;
  username: string;
  password: string;
}