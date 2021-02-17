import mongoose from 'mongoose';
import { ITestPlan } from './testplan.interface';

const TestPlanSchema = new mongoose.Schema({
  name: {
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
  milestone: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'milestone',      
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