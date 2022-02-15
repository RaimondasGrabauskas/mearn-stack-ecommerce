const express = require('express');
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');
// controller
const {
  createSubCategorys,
  readSubCategorys,
  updateSubCategorys,
  removeSubCategorys,
  listSubCategorys,
} = require('../controllers/subCategory');

router.post('/subCategory', authCheck, adminCheck, createSubCategorys);
router.get('/subCategories', listSubCategorys);
router.get('/subCategory/:slug', readSubCategorys);
router.put('/update/subCategory/:slug', authCheck, adminCheck, updateSubCategorys);
router.delete('/delete/subCategory/:slug', authCheck, adminCheck, removeSubCategorys);

module.exports = router;
