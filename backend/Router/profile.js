import express from "express";
import Admin from "../Models/Admin.js";
const router = express.Router();

router.get("/api/admin/profile", async (req, res, next) => {
  const admin = await Admin.find();
  res.send(admin);
});

export default router;
