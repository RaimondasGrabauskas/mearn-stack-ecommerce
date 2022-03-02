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
  let products = await Product.find({})
    .limit(parseInt(req.params.count))
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

exports.read = async (req, res) => {
  const itemSlug = req.params.slug;
  const singleProduct = await Product.findOne({ slug: itemSlug }).populate('category').populate('subs').exec();
  res.json(singleProduct);
};

exports.update = async (req, res) => {
  let itemSlug = req.params.slug;
  let deteailsOnUpdate = req.body;
  let { title } = req.body;

  try {
    if (title) {
      req.body.slug = slugify(title);
    }
    const updated = await Product.findOneAndUpdate({ slug: itemSlug }, deteailsOnUpdate, { new: true }).exec();
    res.json(updated);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Product update failed');
  }
};
