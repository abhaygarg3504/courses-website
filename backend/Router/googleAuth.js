import express from "express";
import User from "../Models/User.js";
import passport from "passport";
const router = express.Router();
import dotenv from "dotenv";
import pga from "passport-google-oauth20";
import emailFunctions from "../Controller/emailController.js";
const GoogleStrategy = pga.Strategy;
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ email: profile.emails[0].value });
      if (user && user.role === "user") {
        cb(null, user);
      } else {
        const userData = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          isVerified: true,
          role: "user",
        });
        User.register(userData, profile.id).then(async function (
          registerdUser,
          err
        ) {
          if (registerdUser) {
            await emailFunctions.confirmRegistration(
              profile.emails[0].value,
              profile.displayName
            );
            cb(null, registerdUser);
          }
          if (err) {
            cb(err);
          }
        });
      }
    }
  )
);

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: "/api/auth/google/failure",
      failureMessage: true,
    },
    function (err, user, info) {
      if (err) {
        return res.send(err);
      }
      if (!user) {
        return res.send("failure");
      }
      if (user.role === "user") {
        req.logIn(user, async function (err) {
          if (err) {
            return res.status(400).send(err);
          }
          res.cookie.session_id = req.sessionID;
          return res
            .writeHead(301, {
              Location: `${process.env.FRONTEND_URL}`,
            })
            .end();
        });
      }
      else{
        return res.send("failure")
      }
    }
  )(req, res, next);
});

router.get("/failure", (req, res) => {
  res.send("failure");
});

export default router;
