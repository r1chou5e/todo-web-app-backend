const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    user_verified: {
      type: Boolean,
      default: false,
    },
    user_role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    user_settings: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  user: model(DOCUMENT_NAME, userSchema),
};
