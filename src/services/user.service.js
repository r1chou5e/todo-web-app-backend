const { user } = require('../models/user.model');

class UserService {
  static updateUser = async (userId, payload) => {
    const { name, status } = payload;
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      {
        user_name: name,
        user_status: status,
      },
      { new: true }
    );

    if (!updatedUser) throw new Error('Cannot update this user!');
    return {
      updatedUser,
    };
  };

  static changeRole = async (userId, role) => {
    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { user_role: role },
      { new: true }
    );

    if (!updatedUser) throw new Error('Cannot change role!');
    return {
      updatedUser,
    };
  };
}

module.exports = UserService;
