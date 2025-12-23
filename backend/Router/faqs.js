import express from "express";
import faqRoutes from "../Controller/faqController.js";
const router = express.Router();

router.get("/", faqRoutes.allFaq);

export default router;
