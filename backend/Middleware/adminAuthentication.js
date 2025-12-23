import User from "../Models/User.js";
async function adminAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const admin = await User.findOne({ email: req.session.passport.user });
    if (admin.role === "admin") {
      next();
    }
    else{
      res.status(401).send("Not a Admin")
    }
  } else {
    res.status(401).send("Not Authorized");
  }
}

export default adminAuthenticated;
