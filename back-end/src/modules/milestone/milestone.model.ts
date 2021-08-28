import mongoose from 'mongoose';
import { IMilestone } from './milestone.interface';

const MilestoneSchema = new mongoose.Schema({
  milestone_id: {
    type: String
  },
  milestonetitle: {
    type: String
  },
  description: {
    type: String
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
  end_date: {
    type: Date,
    default: Date.now,
  },
  is_completed: {
    type: Boolean,
    default: false,
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

export default mongoose.model<IMilestone & mongoose.Document>('milestone', MilestoneSchema);