const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { picture, email } = req.user;
  console.log('req body', req.user);

  const updateDetails = {
    name: email.split('@')[0],
    picture: picture,
  };

  const user = await User.findOneAndUpdate(email, updateDetails, { new: true });

  if (user) {
    console.log('user updated', user);
    res.json(user);
  } else {
    const newUser = await new User({
      email: email,
      name: email.split('@')[0],
      picture: picture,
    }).save();
    console.log('User creadted', newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const { email } = req.user;
  User.findOne({ email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
