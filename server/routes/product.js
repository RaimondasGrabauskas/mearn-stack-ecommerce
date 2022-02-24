const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const { createProduct, listAll, remove } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/products/:count', listAll);
router.delete('/delete/product/:slug', authCheck, adminCheck, remove);

module.exports = router;
