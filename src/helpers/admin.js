export const isAdmin = (req, res, next) => {
    if (req.user) {
      return next();
    }
    req.flash("error_msg", "Not Authorized.");
    res.redirect("/signin");
  };