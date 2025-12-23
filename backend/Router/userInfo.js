import express from "express";
import userController from "../Controller/userController.js";
const router = express.Router();

router.get("/", userController.userInfo);

router.get("/contact", userController.userContact);

router.post('/add-number' , userController.addNumber)

export default router;
