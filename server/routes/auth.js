const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const { createOrUpdateUser, currentUser } = require('../controllers/auth');

router.post('/create_or_update_user', authCheck, createOrUpdateUser);
router.post('/current_user', authCheck, currentUser);
router.post('/current_admin', authCheck, adminCheck, currentUser);
module.exports = router;
