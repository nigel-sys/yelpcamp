const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register');
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = await new User({ username, email });
    const registerUser = await User.register(user, password);
    req.logIn(registerUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('/campgrounds');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');
  }
};

module.exports.renderLogInForm = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome Back to Yelp Camp!');
  const requestUrl = req.session.returnTo || '/campgrounds';
  delete req.session.returnTo;
  res.redirect(requestUrl);
};

module.exports.logout = (req, res) => {
  req.logOut();
  req.flash('success', 'Goodbye!');
  res.redirect('/campgrounds');
};
