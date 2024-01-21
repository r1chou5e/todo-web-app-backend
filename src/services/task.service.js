const { list } = require('../models/list.model');
const { task } = require('../models/task.model');

class TaskService {
  static createNewTask = async ({
    userId,
    listId,
    title,
    description,
    duedate,
    priority,
  }) => {
    const foundList = await list.findById(listId);
    if (!foundList) throw new Error('List not exists!');

    const newTask = await task.create({
      task_user_id: userId,
      task_list_id: listId,
      task_title: title,
      task_description: description,
      task_duedate: duedate,
      task_priority: priority,
    });

    if (!newTask) throw new Error('Cannot create new task!');

    return {
      newTask,
    };
  };

  static getTasksByList = async (listId) => {
    const tasksByList = await task.find({ task_list_id: listId }).lean();
    if (!tasksByList) throw new Error('Cannot get tasks by list!');
    return {
      tasksByList,
    };
  };
}

module.exports = TaskService;
