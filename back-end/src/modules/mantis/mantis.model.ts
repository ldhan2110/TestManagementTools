import mongoose from 'mongoose';
import { IMantis } from './mantis.interface';

const MantisSchema = new mongoose.Schema({
    mantisname: {
        type: String
    },
    url: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
    },
    project_id_mantis: {
        type: String
    },
    members: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            username_mantis: {
                type: String,
            },
            usermantis_id: {
                type: String
            },
            username: {
                type: String,
            },
            email: {
                type: String
            },
            role_mantis: {
                type: String,
            },
            is_active_backend: {
                type: Boolean,
                default: false
            },
            token_mantis: {
                type: String
            },
            enable_mantis: {
                type: Boolean,
                default: true
                },
            protected_mantis: {
                type: Boolean,
                default: false
            },
            created_date: {
                type: Date,
                default: Date.now,
            },
            url: {
                type: String
            },
        },
    ],
    categories: [
        {
            categoryname: {
                type: String,
            },
            created_date: {
                type: Date,
                default: Date.now,
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

export default mongoose.model<IMantis & mongoose.Document>('mantis', MantisSchema);