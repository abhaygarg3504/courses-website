import express from "express";
import messageFuctions from "../Controller/messageController.js";
import adminAuthenticated from "../Middleware/adminAuthentication.js";
const router = express.Router();

router.post("/", messageFuctions.message);

router.post("/get/data", adminAuthenticated , messageFuctions.getMessages);

export default router;
