import IUser from './users.interface';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  introduction: {
    type: String,
  },
  phonenumber: {
    type: String,
  },
  avatar: {
    type: String,
  },
  myproject:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },
  ], 
  inproject:[
    {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'project',
    },
    projectname: {
      type: String,
    },
    role: {
      type: String,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  ],
  testexecution: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testexecution',      
    },
  ],
  mantis:[
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mantis',
      },
      mantisname: {
        type: String,
      },
      role: {
        type: String,
      },
      status: {
        type: String,
      },
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model<IUser & mongoose.Document>('user', UserSchema);