const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find()
    .limit(req.params.count)
    .populate('category')
    .populate('subs')
    .sort([['createdAt', 'desc']])
    .exec();

  res.json(products);
};

exports.remove = async (req, res) => {
  const itemSlug = req.params.slug;
  try {
    const deletedProduct = await Product.findOneAndRemove({ slug: itemSlug }).exec();
    res.json(deletedProduct);
  } catch (err) {
    console.log(err);
    res.status(400).send('Product delete failed');
  }
};
