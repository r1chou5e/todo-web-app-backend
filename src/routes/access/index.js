const express = require('express');
const accessController = require('../../controllers/access.controller');
const { authentication } = require('../../utils/auth.util');
const asyncHandler = require('../../helpers/asyncHandler');
const router = express.Router();

router.post('/signup', asyncHandler(accessController.signUp));
router.post('/login', asyncHandler(accessController.logIn));

router.use(authentication);

module.exports = router;
