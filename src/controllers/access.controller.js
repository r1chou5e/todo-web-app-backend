const AccessService = require('../services/access.service');

class AccessController {
  signUp = async (req, res, next) => {
    const metadata = await AccessService.signUp(req.body);
    return res.status(201).json({
      message: 'Successful registered !!',
      metadata,
    });
  };

  logIn = async (req, res, next) => {
    const metadata = await AccessService.logIn(req.body);
    return res.status(201).json({
      message: 'Successful login!',
      metadata,
    });
  };
}

module.exports = new AccessController();
