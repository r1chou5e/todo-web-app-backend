const express = require('express');
const { authentication } = require('../../utils/auth.util');
const asyncHandler = require('../../helpers/asyncHandler');
const userController = require('../../controllers/user.controller');
const router = express.Router();

router.use(authentication);
router.put('/update', asyncHandler(userController.updateUser));
router.put('/update/:userId', asyncHandler(userController.updateUserByAdmin));
router.put('/update/role/:userId', asyncHandler(userController.changeRole));
router.delete('/delete/:userId', asyncHandler(userController.deleteUser));
router.post(
  '/send-confirmation',
  asyncHandler(userController.sendEmailConfirmation)
);
router.post('/confirm/:token', asyncHandler(userController.confirmEmail));

module.exports = router;
