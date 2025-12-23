import express from "express";
const router = express.Router();
import userController from "../Controller/userController.js";

router.get("/data", userController.userList);

router.post("/edit", userController.editUser);

router.get("/search", userController.searchUser);

export default router;
