const UserService = require('../services/user.service');
const { checkAdmin } = require('../utils/user.util');

class UserController {
  updateUser = async (req, res, next) => {
    const metadata = await UserService.updateUser(req.user.userId, req.body);
    return res.status(200).json({
      message: 'Successful update user!',
      metadata,
    });
  };

  changeRole = async (req, res, next) => {
    const isAdmin = await checkAdmin(req.user.userId);
    if (!isAdmin) throw new Error('Not Authorization!');
    const metadata = await UserService.changeRole(
      req.params.userId,
      req.body.role
    );
    return res.status(200).json({
      message: 'Successful change role!',
      metadata,
    });
  };

  deleteUser = async (req, res, next) => {
    const isAdmin = await checkAdmin(req.user.userId);
    if (!isAdmin) throw new Error('Not Authorization!');
    const metadata = await UserService.deleteUser(req.params.userId);
    return res.status(200).json({
      message: 'Successful delete user!',
      metadata,
    });
  };
}

module.exports = new UserController();
