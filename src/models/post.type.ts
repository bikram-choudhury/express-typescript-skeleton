import mongoose, { Document } from 'mongoose';
export interface postType extends Document {
    userId: number;
    title: string;
    body: string;
  }