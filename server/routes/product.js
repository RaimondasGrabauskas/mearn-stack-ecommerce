const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const {
  createProduct,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, createProduct);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
router.delete('/delete/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/update/product/:slug', authCheck, adminCheck, update);
router.post('/products', list);

// rating

router.put('/product/star/:productId', authCheck, productStar);

// related product

router.get('/product/related/:productId', listRelated);

// search
router.post('/search/filters', searchFilters);

module.exports = router;
