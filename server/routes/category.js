const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const {
  createCategorys,
  readCategorys,
  updateCategorys,
  removeCategorys,
  listCategorys,
} = require('../controllers/category');

router.post('/category', authCheck, adminCheck, createCategorys);
router.get('/categories', listCategorys);
router.get('/category/:slug', authCheck, adminCheck, readCategorys);
router.put('/update/category/:slug', authCheck, adminCheck, updateCategorys);
router.delete('/delete/category/:slug', authCheck, adminCheck, removeCategorys);

module.exports = router;
