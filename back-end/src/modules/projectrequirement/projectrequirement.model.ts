import mongoose from 'mongoose';
import { IProjectRequirement } from './projectrequirement.interface';

const ProjectRequirementSchema = new mongoose.Schema({
  projectrequirement_id: {
    type: String
  },
  projectrequirementname: {
    type: String
  },
  description: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_public: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
  is_disable: {
    type: Boolean,
    default: false,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  testexecution: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testexecution',      
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
  
  export default mongoose.model<IProjectRequirement & mongoose.Document>('projectrequirement', ProjectRequirementSchema);