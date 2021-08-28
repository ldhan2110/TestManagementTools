import mongoose, { Document } from 'mongoose';

import { IProfile } from './profile.interface';

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  fullname: {
    type: String,
  },
  email: {
    type: String,
  },
  introduction: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
  created_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  updated_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

export default mongoose.model<IProfile & Document>('profile', ProfileSchema);