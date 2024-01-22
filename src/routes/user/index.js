const express = require('express');
const { authentication } = require('../../utils/auth.util');
const asyncHandler = require('../../helpers/asyncHandler');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router.use(authentication);
router.put('/update', asyncHandler(userController.updateUser));
router.put('/update/role/:userId', asyncHandler(userController.changeRole));
router.delete('/delete/:userId', asyncHandler(userController.deleteUser));

module.exports = router;
