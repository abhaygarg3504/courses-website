import express from "express";
import Admin from "../Models/Admin.js";
import Course from "../Models/Course.js";
import User from "../Models/User.js";
import Messages from "../Models/Messages.js";
const router = express.Router();

router.get("/api/dashboard", async (req, res, next) => {
  const course = await Course.find().countDocuments();
  const user = await User.find().countDocuments();
  const message = await Messages.find().countDocuments();
  res.status(200).send({ course, user, message });
});

export default router;
