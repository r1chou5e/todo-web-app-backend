const { user } = require('../models/user.model');
const UserService = require('../services/user.service');

class UserController {
  updateUser = async (req, res, next) => {
    const metadata = await UserService.updateUser(req.user.userId, req.body);
    return res.status(200).json({
      message: 'Successful update user!',
      metadata,
    });
  };

  changeRole = async (req, res, next) => {
    const foundUser = await user.findById(req.user.userId);
    if (foundUser.user_role !== 'admin') throw new Error('Not Authorization!');
    const metadata = await UserService.changeRole(
      req.params.userId,
      req.body.role
    );
    return res.status(200).json({
      message: 'Successful change role!',
      metadata,
    });
  };
}

module.exports = new UserController();
