const express = require('express');
const router = express.Router();

const { authCheck, adminCheck } = require('../middlewares/auth');

const { upload, remove } = require('../controllers/cloudinary');

router.post('/uploadimages', authCheck, adminCheck, upload);
router.delete('/removeimages', authCheck, adminCheck, remove);

module.exports = router;
