//This is my middleware/ pass-user.js

const passUser = (req, res, next) => {
    res.locals.user = req.session.user ? req.session.user : null
    next()
  }
  
  module.exports = passUser
  