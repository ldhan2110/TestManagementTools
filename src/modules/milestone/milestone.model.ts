import mongoose from 'mongoose';
import { IMilestone } from './milestone.interface';

const MilestoneSchema = new mongoose.Schema({
  name: {
    type: String
  },
  target_date: {
    type: Date,
    default: Date.now,
  },
  start_date: {
    type: Date,
    default: Date.now,
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