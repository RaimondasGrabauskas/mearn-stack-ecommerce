const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const email = req.user.email;

  const user = await User.findOne({ email }).exec();

  const { cartTotal } = await Cart.findOne({ orderBy: user._id }).exec();
  console.log('cart total', cartTotal);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: cartTotal,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.log('Error creating PaymentIntent:', error.message);
    res.status(500).send({ error: 'Failed to create PaymentIntent' });
  }
};
