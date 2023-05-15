const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);

exports.createPaymentIntent = async (req, res) => {
  const email = req.user.email;

  const { couponApplied } = req.body;

  const user = await User.findOne({ email }).exec();

  const { cartTotal, totalAfterDiscount } = await Cart.findOne({ orderBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = totalAfterDiscount;
  } else {
    finalAmount = cartTotal;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalAmount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      cartTotal,
      totalAfterDiscount,
      payable: finalAmount,
    });
  } catch (error) {
    console.log('Error creating PaymentIntent:', error.message);
    res.status(500).send({ error: 'Failed to create PaymentIntent' });
  }
};
