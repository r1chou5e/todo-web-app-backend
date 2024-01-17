const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'Log';
const COLLECTION_NAME = 'Logs';

const logSchema = new Schema(
  {
    log_action: {
      type: String,
      required: true,
    },
    log_details: {
      type: String,
      default: 'No detail',
    },
    log_timestamp: {
      type: Date,
      default: new Date(),
    },
    log_user_id: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  log: model(DOCUMENT_NAME, logSchema),
};
