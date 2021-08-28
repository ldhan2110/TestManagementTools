import mongoose from 'mongoose';
import { ITestPlan } from './testplan.interface';

const TestPlanSchema = new mongoose.Schema({
  testplan_id: {
    type: String
  },
  testplanname: {
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
  is_disable: {
    type: Boolean,
    default: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  milestone: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'milestone',      
    },
  ],
  testsuite: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testsuite',      
    },
  ], 
  build: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'build',      
    },
  ],
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

export default mongoose.model<ITestPlan & mongoose.Document>('testplan', TestPlanSchema);