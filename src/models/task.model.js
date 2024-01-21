const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'Task';
const COLLECTION_NAME = 'Tasks';

const taskSchema = new Schema(
  {
    task_title: {
      type: String,
      required: true,
    },
    task_description: {
      type: String,
      default: 'No description',
    },
    task_duedate: {
      type: Date,
      default: new Date(),
    },
    task_priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'low',
    },
    task_status: {
      type: String,
      enum: ['incompleted', 'completed'],
      default: 'incompleted',
    },
    task_user_id: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    task_list_id: {
      type: Types.ObjectId,
      required: true,
      ref: 'List',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  task: model(DOCUMENT_NAME, taskSchema),
};
