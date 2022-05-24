const Product = require('../models/product');
const User = require('../models/user');
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

// without pagination
// exports.list = async (req, res) => {
//   const { sort, order, limit } = req.body;
//   try {
//     const products = await Product.find({})
//       .populate('category')
//       .populate('subs')
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (err) {
//     console.log(err);
//   }
// };

// with pagination
exports.list = async (req, res) => {
  const { sort, order, page } = req.body;
  const currentPage = page || 1;
  const perPage = 3;
  try {
    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subs')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const { productId } = req.params;
  const { email } = req.user;
  const { star } = req.body;

  const product = await Product.findById(productId).exec();
  const user = await User.findOne({ email }).exec();

  let existingRatingObject = product.ratings.find((element) => element.postedBy == user._id);

  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRatingObject } },
      { $set: { 'ratings.$.star': star } },
      { new: true }
    ).exec();

    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId).exec();
  const relatedProduct = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate('category')
    .populate('subs')
    .exec();

  res.json(relatedProduct);
};

// search/filter

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate('category', '_id name')
    .populate('subs', '_id name')
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const { query } = req.body;

  if (query) {
    console.log('query', query);
    await handleQuery(req, res, query);
  }
};
