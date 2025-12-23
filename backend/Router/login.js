import express from "express";
import User from "../Models/User.js";
import pl from "passport-local";
import passport from "passport";
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

router.post("/api/user/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).send(err);
    }
    if (!user) {
      return res.status(200).json({message : "User not found" ,success : false});
    }
    if (user.role === "user") {
      req.logIn(user, function (err) {
        if (err) {
          return res.status(400).send(err);
        }
        return res.status(200).json({message:"success",success : true});
      });
    }else{
      res.status(200).json({message : "not a user",success : false})
    }
  })(req, res, next);
});

export default router;
