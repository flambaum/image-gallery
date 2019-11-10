module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next(401)
    }
    next();
  }