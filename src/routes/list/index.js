const express = require('express');
const listController = require('../../controllers/list.controller');
const { authentication } = require('../../utils/auth.util');
const asyncHandler = require('../../helpers/asyncHandler');
const router = express.Router();

router.use(authentication);
router.post('/create', asyncHandler(listController.createNewList));
router.put('/update/:listId', asyncHandler(listController.updateList));
router.delete('/delete/:listId', asyncHandler(listController.deleteList));
router.get('/:userId', asyncHandler(listController.getListsByUser));
router.get('/', asyncHandler(listController.getAllLists));

module.exports = router;
