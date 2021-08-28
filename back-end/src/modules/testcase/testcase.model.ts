import mongoose from 'mongoose';
import { ITestCase} from './testcase.interface';

const TestCaseSchema = new mongoose.Schema({
  testcase_id: {
    type: String
  },
  testcaseName: {
    type: String
  },
  description: {
    type: String
  },
  testsuite:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'testsuite',   
  }, 
  priority: {
    type: String,
  },
  is_assigned: {
    type: Boolean,
    default: false
  },
  total_assigned: {
    type: Number,
    default: 0
  },
  precondition: {
    type: String,
    default: ""
  },
  postcondition: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "TC"
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  listStep: [
    {
      stepDefine: {
        type: String,
        required: true,
        default: " "
      },
      expectResult: {
        type: String,
        required: true,
        default: " "
      },
      type: {
        type: String,
        required: true,
        default: " "
      }
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

export default mongoose.model<ITestCase & mongoose.Document>('testcase', TestCaseSchema);