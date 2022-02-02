const Category = require('../models/category');
const slugify = require('slugify');

exports.createCategorys = async (req, res) => {
  const { name } = req.body;
  console.log(req.body);

  try {
    const category = await new Category({ name, slug: slugify(name) }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send('Create category failed');
  }
};

exports.listCategorys = async (req, res) => res.json(await Category.find().sort({ createdAt: -1 }).exec());

exports.readCategorys = async (req, res) => {
  let categorySlug = req.params.slug;
  const category = await Category.findOne({ slug: categorySlug }).exec();
  res.json(category);
};

exports.updateCategorys = async (req, res) => {
  let categorySlug = req.params.slug;
  const { name } = req.body;
  try {
    const categoryOnUpdate = await Category.findOneAndUpdate(
      { slug: categorySlug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(categoryOnUpdate);
  } catch (err) {
    res.status(400).send('Category update failed');
  }
};

exports.removeCategorys = async (req, res) => {
  let categorySlug = req.params.slug;
  try {
    const deletedCategory = await Category.findOneAndDelete({ slug: categorySlug });
    res.json(deletedCategory);
  } catch (err) {
    console.log(err);
    res.status(400).send('Category delete failed');
  }
};