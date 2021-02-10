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
  option_reqs: {
    type: String,
  },
  option_priority: {
    type: String,
  },
  options: {
    type: String,
  },
  prefix: {
    type: String,
  },
  tc_counter: {
    type: Number,
  },
  is_public: {
    type: Boolean,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  update_date: {
    type: Date,
    default: Date.now,
  },
  create_user: {
    type: String,
  },
  update_userid: {
    type: String,
  },
});

export default mongoose.model<IProject & mongoose.Document>('project', ProjectSchema);