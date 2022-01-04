const express = require('express');
const router = express.Router();

router.get('/user_route', (req, res) => {
  res.json({ data: 'hey you hit user route' });
});

module.exports = router;
