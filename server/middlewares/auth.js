const admin = require('../firebase/index');

exports.authCheck = (req, res, callback) => {
  console.log(req.headers);
  callback();
};
