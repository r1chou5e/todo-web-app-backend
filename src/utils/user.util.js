const { user } = require('../models/user.model');

const checkAdmin = async (userId) => {
  const foundUser = await user.findById(userId);
  return foundUser.user_role === 'admin';
};

module.exports = {
  checkAdmin,
};
