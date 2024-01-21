const { list } = require('../models/list.model');

class ListService {
  static createNewList = async ({ userId, title, description, duedate }) => {
    const newList = await list.create({
      list_user_id: userId,
      list_title: title,
      list_description: description,
      list_duedate: duedate,
    });

    if (!newList) throw new Error('Cannot create new list!');
    return {
      list: newList,
    };
  };

  static getAllLists = async () => {
    const allLists = await list.find({}).lean();
    if (!allLists) throw new Error('Cannot get all list!');
    return {
      allLists,
    };
  };

  static getListsByUser = async (userId) => {
    const listsByUser = await list.find({ list_user_id: userId }).lean();
    if (!listsByUser) throw new Error('Cannot get lists by user');
    return {
      listsByUser,
    };
  };
}

module.exports = ListService;
