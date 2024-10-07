// This is my middleware/ signed-in.js

const signedIn = (req, res, next) => {
    if (req.session.user) return next();
    res.redirect('/auth/signed-in');
  };
  
  module.exports = signedIn;