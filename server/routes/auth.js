const express = require('express');
const router = express.Router();
const { createOrUpdateUser } = require('../controllers/auth');

router.get('/create_or_update_user', createOrUpdateUser);

module.exports = router;
