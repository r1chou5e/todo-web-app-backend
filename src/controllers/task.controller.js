const TaskService = require('../services/task.service');

class TaskController {
  createNewTask = async (req, res, next) => {
    const metadata = await TaskService.createNewTask({
      ...req.body,
      userId: req.user.userId,
    });

    return res.status(201).json({
      message: 'Successful create new task !!',
      metadata,
    });
  };

  getTasksByList = async (req, res, next) => {
    const metadata = await TaskService.getTasksByList(req.params.listId);
    return res.status(200).json({
      message: 'Success get tasks by list',
      metadata,
    });
  };

  updateTask = async (req, res, next) => {
    const metadata = await TaskService.updateTask(req.params.taskId, req.body);
    return res.status(200).json({
      message: 'Success update task!',
      metadata,
    });
  };

  deleteTask = async (req, res, next) => {
    const metadata = await TaskService.deleteTask(req.params.taskId);
    return res.status(200).json({
      message: 'Success delete task!',
      metadata,
    });
  };

  deleteTasksByList = async (req, res, next) => {
    const metadata = await TaskService.deleteTasksByList(req.params.listId);
    return res.status(200).json({
      message: 'Success delete tasks by listId!',
      metadata,
    });
  };
}

module.exports = new TaskController();
