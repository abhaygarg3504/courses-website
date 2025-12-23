import express from "express";
const router = express.Router();
import authController from '../Controller/authController.js'

router.get("/user", authController.userAuthentication);

router.get("/admin", authController.adminAuthentication);

export default router;