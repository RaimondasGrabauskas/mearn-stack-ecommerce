const express = require('express');
const router = express.Router();

// middlewares
const { authCheck } = require('../middlewares/auth');

// controllers
const { userCart, getUserCart, emptyCart, saveAddress } = require('../controllers/user');

router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);
// router.get('/user_route', (req, res) => {
//   res.json({ data: 'hey you hit user route' });
// });

module.exports = router;
