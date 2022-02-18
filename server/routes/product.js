const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const { createProduct, readProduct } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/products', readProduct);

module.exports = router;
