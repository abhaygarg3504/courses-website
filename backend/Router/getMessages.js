import express from "express";
import messageFuctions from "../Controller/messageController.js";
const router = express.Router();

router.get("/data", messageFuctions.getMessages);

export default router;
