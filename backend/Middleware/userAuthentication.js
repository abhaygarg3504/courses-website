import User from "../Models/User.js";

async function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const user = await User.findOne({ email: req.session.passport.user });
    if (user.role === "user") {
      next();
    }
    else{
        res.status(401).send("Not a user.")
    }
  } else {
    res.status(401).send("user is not registered");
  }
}

export default isAuthenticated;
