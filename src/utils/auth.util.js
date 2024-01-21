const jwt = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'refresh-token',
};

const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  const token = req.headers[HEADER.AUTHORIZATION];
  if (!token) throw new Error('Invalid request!');
  try {
    const secretKey = process.env.SECRET_TOKEN_KEY;
    const decodeUser = jwt.verify(token, secretKey);
    if (userId !== decodeUser.userId) throw new Error('Invalid userId');
    req.user = decodeUser;
    return next();
  } catch (error) {
    throw error;
  }
});

const generateToken = (payload) => {
  const secretKey = process.env.SECRET_TOKEN_KEY;
  return jwt.sign(payload, secretKey, {
    expiresIn: '2 days',
  });
};

module.exports = {
  generateToken,
  authentication,
};
