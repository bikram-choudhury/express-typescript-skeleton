import mongoose, { Schema } from 'mongoose';
import { postType } from '../models/post.type';

const PostSchema: Schema = new Schema({
    userId: { type: Number, required: true},
    title: { type: String, required: true },
    body: { type: String, required: true }
});

export default mongoose.model<postType>('posts', PostSchema);