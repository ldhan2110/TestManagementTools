import mongoose from 'mongoose';
import { IBuild} from './build.interface';

const BuildSchema = new mongoose.Schema({
  build_id: {
    type: String
  },
  buildname: {
    type: String
  },
  description: {
    type: String
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  is_open: {
    type: Boolean,
    default: false,
  },
  is_disable: {
    type: Boolean,
    default: true,
  },
  releasedate: {
    type: Date,
    default: Date.now,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project',
  },
  testplan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'testplan',
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

export default mongoose.model<IBuild & mongoose.Document>('build', BuildSchema);