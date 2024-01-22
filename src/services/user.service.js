const { user } = require('../models/user.model');
const { checkAdmin } = require('../utils/user.util');

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

  static deleteUser = async (userId) => {
    const isAdmin = await checkAdmin(userId);
    if (isAdmin) throw new Error('Cannot delete admin!');

    const deletedUser = await user.findByIdAndDelete(userId);
    if (!deletedUser) throw new Error('Cannot delete this user!');
    return {
      deletedUser,
    };
  };
}

module.exports = UserService;
