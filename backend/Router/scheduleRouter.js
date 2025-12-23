import express from "express";
import scheduleController from "../Controller/scheduleController.js";
const router = express.Router();

router.post("/", scheduleController);

export default router;
