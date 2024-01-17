const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'Notification';
const COLLECTION_NAME = 'Notifications';

const notificationSchema = new Schema(
  {
    noti_message: {
      type: String,
      default: 'No message',
    },
    noti_timestamp: {
      type: Date,
      default: new Date(),
    },
    noti_user_id: {
      type: Types.ObjectId,
      ref: 'User',
    },
    noti_status: {
      type: String,
      enum: ['read', 'unread'],
      default: 'unread',
    },
    noti_type: {
      type: String,
      enum: ['deadline', 'daily', 'process', 'priority', 'policy'],
      default: 'daily-remind',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  notification: model(DOCUMENT_NAME, notificationSchema),
};
