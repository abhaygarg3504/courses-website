import express from "express";
import emailFunctions from "../Controller/emailController.js";
const router = express.Router();

router.post("/forgot/password",emailFunctions.resetPassword);

router.post("/verification",emailFunctions.emailVerification);

router.get("/resend/otp",emailFunctions.resendOTP);

export default router;
