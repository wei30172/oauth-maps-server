const requireUser = (req, res, next) => {
  const user = req.session.user;

  if (!user) {
    return res.status(403);
  }

  return next();
};

module.exports = { requireUser };
