const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const { createProduct } = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);
// router.get('/categories', listCategorys);
// router.get('/category/:slug', readCategorys);
// router.put('/update/category/:slug', authCheck, adminCheck, updateCategorys);
// router.delete('/delete/category/:slug', authCheck, adminCheck, removeCategorys);

module.exports = router;
