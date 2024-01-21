const UserService = require('../services/user.service');

class UserController {
  updateUser = async (req, res, next) => {
    const metadata = await UserService.updateUser(req.user.userId, req.body);
    return res.status(200).json({
      message: 'Successful update user!',
      metadata,
    });
  };
}

module.exports = new UserController();
