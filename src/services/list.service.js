const { list } = require('../models/list.model');
const { task } = require('../models/task.model');
const { checkAdmin } = require('../utils/user.util');
const { deleteTasksByList } = require('./task.service');

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
      newList,
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

  static deleteList = async (listId) => {
    const foundList = await list.findById(listId);
    if (!foundList) throw new Error('List not found!');

    const tasksByList = await task.find({ task_list_id: listId });
    let deletedTasks = [];
    if (tasksByList.length > 0) {
      deletedTasks = await deleteTasksByList(listId);
    }
    const deletedList = await foundList.deleteOne();
    if (!deletedList.acknowledged) throw new Error('Cannot delete this list!');

    return {
      deletedList: foundList,
      deletedTasks: deletedTasks.deletedTaskByList,
    };
  };

  static updateList = async (userId, listId, payload) => {
    const { title, description, duedate, status } = payload;

    const foundList = await list.findById(listId);
    if (!foundList) throw new Error('List not found!');

    if (foundList.list_user_id !== userId && !(await checkAdmin(userId)))
      throw new Error('Not Authorization!');

    const updatedList = await foundList.updateOne({
      list_title: title,
      list_description: description,
      list_duedate: duedate,
      list_status: status,
    });

    if (!updatedList) throw new Error('Cannot update this list!');
    return {
      updatedList,
    };
  };
}

module.exports = ListService;
