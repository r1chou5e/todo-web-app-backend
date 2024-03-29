const { default: mongoose } = require('mongoose');
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

  static deleteTask = async (taskId) => {
    const deletedTask = await task.findByIdAndDelete(taskId);
    if (!deletedTask) throw new Error('Cannot delete this task!');
    return {
      deletedTask,
    };
  };

  static deleteTasksByList = async (listId) => {
    const tasks = await task.find({ task_list_id: listId });
    if (tasks.length === 0) throw new Error('Tasks not found!');

    const session = await mongoose.startSession();

    await session.startTransaction();
    const deletedTaskByList = await task.deleteMany({ task_list_id: listId });
    if (deletedTaskByList.deletedCount !== tasks.length) {
      await session.abortTransaction();
      throw new Error('Failed to delete these tasks!');
    }

    await session.commitTransaction();

    return {
      deletedTaskByList: tasks,
    };
  };

  static updateTask = async (taskId, payload) => {
    const { title, description, duedate, priority, status } = payload;
    const updatedTask = await task.findByIdAndUpdate(
      taskId,
      {
        task_title: title,
        task_description: description,
        task_duedate: duedate,
        task_priority: priority,
        task_status: status,
      },
      { new: true }
    );

    if (!updatedTask) throw new Error('Cannot update this task!');
    return {
      updatedTask,
    };
  };
}

module.exports = TaskService;
