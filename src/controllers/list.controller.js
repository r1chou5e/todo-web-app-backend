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

  getAllLists = async (req, res, next) => {
    const metadata = await ListService.getAllLists();
    return res.status(200).json({
      message: 'Successful get all lists !!',
      metadata,
    });
  };

  getListsByUser = async (req, res, next) => {
    const metadata = await ListService.getListsByUser(req.params.userId);
    return res.status(200).json({
      message: 'Successful get lists by user !!',
      metadata,
    });
  };

  deleteList = async (req, res, next) => {
    const metadata = await ListService.deleteList(req.params.listId);
    return res.status(200).json({
      message: 'Successful delete list!!',
      metadata,
    });
  };

  updateList = async (req, res, next) => {
    const metadata = await ListService.updateList(
      req.user.userId,
      req.params.listId,
      req.body
    );
    return res.status(200).json({
      message: 'Successful update list!',
      metadata,
    });
  };
}

module.exports = new ListController();
