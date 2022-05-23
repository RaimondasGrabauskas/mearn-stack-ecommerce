const SubCategory = require('../models/subCategory');
const Product = require('../models/product');
const slugify = require('slugify');

exports.createSubCategorys = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const subCategory = await new SubCategory({ name, parent, slug: slugify(name) }).save();
    res.json(subCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create sub category failed');
  }
};

exports.listSubCategorys = async (req, res) => res.json(await SubCategory.find().sort({ createdAt: -1 }).exec());

exports.readSubCategorys = async (req, res) => {
  let subCategorySlug = req.params.slug;
  const subCategory = await SubCategory.findOne({ slug: subCategorySlug }).exec();
  const products = await Product.find({ subs: subCategory }).populate('category').exec();
  res.json({
    subCategory,
    products,
  });
};

exports.updateSubCategorys = async (req, res) => {
  let subCategorySlug = req.params.slug;
  const { name, parent } = req.body;
  try {
    const subCategoryOnUpdate = await SubCategory.findOneAndUpdate(
      { slug: subCategorySlug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(subCategoryOnUpdate);
  } catch (err) {
    res.status(400).send('Sub Category update failed');
  }
};

exports.removeSubCategorys = async (req, res) => {
  let subCategorySlug = req.params.slug;
  try {
    const deletedSubCategory = await SubCategory.findOneAndDelete({ slug: subCategorySlug });
    res.json(deletedSubCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send('Sub Category delete failed');
  }
};
