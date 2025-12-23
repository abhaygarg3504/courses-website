import express from "express";
const router = express.Router();
import faqRoutes from "../Controller/faqController.js";

router.post("/edit", faqRoutes.editFaq);

router.post("/delete", faqRoutes.deleteFaq);

router.post("/add", faqRoutes.addFaq);

export default router;
