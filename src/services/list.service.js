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
}

module.exports = ListService;
