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
}

module.exports = new TaskController();
