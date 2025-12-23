import express from "express";
import User from "../Models/User.js";
const router = express.Router();

router.post("/api/user/reset/password", function (req, res, next) {
  let id = req.body.id.split("=").pop();
  try {
    User.findById(id).then(
      function (sanitizedUser) {
        if (sanitizedUser) {
          sanitizedUser.setPassword(req.body.password, function () {
            sanitizedUser.save();
            res.status(200).send(true);
          });
        } else {
          res.status(200).send(false);
        }
      },
      function (err) {
        console.error(err);
      }
    );
  } catch (error) {
    res.status(400).send("some error occurred");
  }
});

export default router;
