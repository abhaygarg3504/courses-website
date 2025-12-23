import express from "express";
import pl from "passport-local";
import passport from "passport";
import User from "../Models/User.js";
const router = express.Router();
const localStrategy = pl.Strategy;

passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
    },
    User.authenticate()
  )
);

router.post("/api/admin/login", async function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({message : "email or password is incorrect"});
    }
    if (!user) {
      return res.status(400).json({message : "email or password is incorrect"});
    }
    if (user.role === "admin") {
      req.logIn(user, function (err) {
        if (err) {
          return res.send(err);
        }
        return res.status(200).json({message : "Login successfull"});
      });
    }
    else{
      return res.status(400).json({message : "email or password is incorrect"});
    }
  })(req, res, next);
});

export default router;
