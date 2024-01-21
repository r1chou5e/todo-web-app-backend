const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'List';
const COLLECTION_NAME = 'Lists';

const listSchema = new Schema(
  {
    list_title: {
      type: String,
      required: true,
    },
    list_description: {
      type: String,
      default: 'No description',
    },
    list_duedate: {
      type: Date,
      default: new Date(),
    },
    list_status: {
      type: String,
      enum: ['incompleted', 'completed'],
      default: 'incompleted',
    },
    list_user_id: {
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
  list: model(DOCUMENT_NAME, listSchema),
};
