const express = require('express');
const listController = require('../../controllers/list.controller');
const { authentication } = require('../../utils/auth.util');
const asyncHandler = require('../../helpers/asyncHandler');
const router = express.Router();

router.use(authentication);
router.post('/create', asyncHandler(listController.createNewList));

module.exports = router;