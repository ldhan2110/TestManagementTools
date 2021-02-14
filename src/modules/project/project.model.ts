import mongoose from 'mongoose';
import IProject from './project.interface';

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  active: {
    type: Boolean,
  },
  is_public: {
    type: Boolean,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      role: {
        type: String,
        enum: ['projectmanager', 'tester'],
        default: 'tester',
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  projectrequirement: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projectrequirement',
    },
  ], 
  testplan: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testplan',      
    },
  ], 
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

export default mongoose.model<IProject & mongoose.Document>('project', ProjectSchema);