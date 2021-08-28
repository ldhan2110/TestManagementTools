import mongoose from 'mongoose';
import { INotification } from './notification.interface';

const NotificationSchema = new mongoose.Schema({
  description: {
    type: String
  },
  is_read: {
    type: Boolean,
    default: false,
  }, 
  url: {
    type: String
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<INotification & mongoose.Document>('notification', NotificationSchema);