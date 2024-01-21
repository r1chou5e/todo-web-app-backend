const express = require('express');
const { authentication } = require('../../utils/auth.util');
const asyncHandler = require('../../helpers/asyncHandler');
const taskController = require('../../controllers/task.controller');
const router = express.Router();

router.use(authentication);
router.post('/create', asyncHandler(taskController.createNewTask));
router.put('/update/:taskId', asyncHandler(taskController.updateTask));
router.delete('/delete/:taskId', asyncHandler(taskController.deleteTask));
router.delete(
  '/delete/list/:listId',
  asyncHandler(taskController.deleteTasksByList)
);
router.get('/:listId', asyncHandler(taskController.getTasksByList));

module.exports = router;
