const admin = require('../firebase/index');

exports.authCheck = async (req, res, callback) => {
  try {
    const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;
    callback();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: 'Invalid or expired token',
    });
  }
};
