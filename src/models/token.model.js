const { Types, Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'Token';
const COLLECTION_NAME = 'Tokens';

const tokenSchema = new Schema(
  {
    token_user: {
      type: Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token_private_key: {
      type: String,
      required: true,
    },
    token_public_key: {
      type: String,
      required: true,
    },
    token_refresh_token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

module.exports = {
  token: model(DOCUMENT_NAME, tokenSchema),
};
