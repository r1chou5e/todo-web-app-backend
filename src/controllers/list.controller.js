const ListService = require('../services/list.service');

class ListController {
  createNewList = async (req, res, next) => {
    const metadata = await ListService.createNewList({
      ...req.body,
      userId: req.user.userId,
    });
    return res.status(201).json({
      message: 'Successful create new list !!',
      metadata,
    });
  };
}

module.exports = new ListController();
