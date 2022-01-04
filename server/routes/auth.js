const express = require('express');
const router = express.Router();
// middlewares
const { authCheck } = require('../middlewares/auth');
// controller
const { createOrUpdateUser } = require('../controllers/auth');

router.get('/create_or_update_user', authCheck, createOrUpdateUser);

module.exports = router;
