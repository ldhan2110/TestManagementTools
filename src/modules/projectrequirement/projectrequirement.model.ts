import mongoose from 'mongoose';
import { IProjectRequirement } from './projectrequirement.interface';

const ProjectRequirementSchema = new mongoose.Schema({
  name:{
    type: String
    },
      description:{
      type: String
      },
    scope: {
        type: String
      },
      type: {
        type: String,
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
  
  export default mongoose.model<IProjectRequirement & mongoose.Document>('projectrequirement', ProjectRequirementSchema);