import express from "express";
import User from "../Models/User.js";
import OTPs from "../Models/otpModel.js";
import pl from "passport-local";
import passport from "passport";
import otp from "otp-generator";
import emailFunctions from "../Controller/emailController.js";
const router = express.Router();
const localStrategy = pl.Strategy;

passport.use(
  new localStrategy(
    {
      usernameField: "email",
    },
    User.authenticate()
  )
);

router.post("/api/user/register", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(409).json({ message: "Email already registered." });
  } else {
    const userData = new User({
      username: req.body.name,
      number: req.body.number,
      email: req.body.email,
      country: req.body.country,
      role: "user",
    });
    User.register(userData, req.body.password).then(function (registerdUser) {
      passport.authenticate("local", function (err, user, info) {
        if (err) {
          return res.status(400).send("some error occurred");
        }
        if (!user) {
          return res.status(400).send("some error occurred");
        }
        if (user.role === "user") {
          req.logIn(user, async function (err) {
            if (err) {
              return res.status(400).send("some error occurred");
            }
            res.cookie.session_id = req.sessionID;
            try {
              const newOTP = otp.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
              });
              await emailFunctions.confirmEmail(
                req.body.email,
                req.body.name,
                newOTP
              );
              const otpObject = await OTPs.findOne({ email: req.body.email });
              if (otpObject) {
                await OTPs.updateOne(
                  { email: req.body.email },
                  { $set: { otp: otp } },
                  { upsert: true }
                );
              } else {
                await OTPs.create({
                  email: req.body.email,
                  otp: newOTP,
                });
              }
              return res.status(200).send("success");
            } catch (error) {
              console.log(error);
              res.statusCode(400).json({ message: "Some error occured." });
            }
          });
        }
        else{
          return res.status(400).send("failure")
        }
      })(req, res, next);
    });
  }
});

export default router;
