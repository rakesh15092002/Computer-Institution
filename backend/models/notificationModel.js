import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: 'Message',
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: () => new Date().toLocaleString('en-IN'),
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notification', notificationSchema);
