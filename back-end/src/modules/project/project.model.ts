import mongoose from 'mongoose';
import IProject from './project.interface';

const ProjectSchema = new mongoose.Schema({
  projectname: {
    type: String,
    required:true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: 'In progress',
  },
  active: {
    type: Boolean,
  },
  is_public: {
    type: Boolean,
  },
  mantis: {
    type: String,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
      username: {
        type: String,
      },
      fullname: {
        type: String,
      },
      email: {
        type: String,
      },
      role: {
        type: String,
        enum: ['Project Manager', 'Tester', 'Test Lead','Guest'],
        default: 'Tester',
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
  build: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'build',      
    },
  ],
  milestone: [
    {
    milestoneid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'milestone',      
    },
    milestonename: {
      type: String,
    },
  }
  ],
  testsuite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testsuite',      
    },
  ],
  testcase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testcase',      
    },
  ],
  testexecution: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testexecution',      
    },
  ],  
  // notification: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'notification',      
  //   },
  // ],
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