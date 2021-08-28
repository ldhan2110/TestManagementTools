import mongoose from 'mongoose';
import { ITestExecution } from './testexecution.interface';

const TestExecutionSchema = new mongoose.Schema({
  testexecutionname: {
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
    type: String,
    enum: ['Untest', 'Pass', 'Fail', 'Block'],
    default: 'Untest',
  },
  exectestcases: [
    {
    type: {
      type: String,
      default: "TC"
    },
    testcaseName: {
      type: String
    },
    description: {
      type: String
    },
    precondition: {
      type: String
    },
    postcondition: {
      type: String
    },
    testsuite:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testsuite',   
    }, 
    priority: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Untest', 'Pass', 'Fail', 'Block'],
      default: 'Untest',
    },
    note: {
      type: String,
      default: ' ',
    },
    listStep: [
      {
        stepDefine: {
          type: String,
          required: true,
        },
        expectResult: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['Untest', 'Pass', 'Fail', 'Block'],
          default: 'Untest',
        },
        note: {
          type: String,
          default: ' ',
        },
      },
    ], 
    
    }
  ],
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  }, 
  testplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'testplan',
  }, 
  tester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  build: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'build',
  },
  listprojectrequirement: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'projectrequirement',      
    },
  ],
  listtestcases: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'testcase',      
    },
  ],
  issue: [
    {
      issue_id: {
        type: String
      },
      url: {
        type: String
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

export default mongoose.model<ITestExecution & mongoose.Document>('testexecution', TestExecutionSchema);