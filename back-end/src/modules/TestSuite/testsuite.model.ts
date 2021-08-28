import mongoose from 'mongoose';
import { ITestSuite } from './testsuite.interface';

const TestSuiteSchema = new mongoose.Schema({
  testsuite_id: {
    type: String
  },
  testsuitename: {
    type: String
  },
  description: {
    type: String
  },
  priority: {
    type: String,
  },
  is_assigned: {
    type: Boolean,
    default: false
  },
  total_testcase: {
    type: Number,
    default: 0
  },
  numberof_testcaseuntest: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: "TS"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  testcase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testcase',      
    },
  ],
  testsuite_child: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testsuite',      
    },
  ],
  testsuite_parent:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'testsuite',   
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

export default mongoose.model<ITestSuite & mongoose.Document>('testsuite', TestSuiteSchema);