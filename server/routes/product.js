const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const { createProduct, listAll } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/products/:count', listAll);

module.exports = router;
