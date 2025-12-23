import express from "express";
const router = express.Router();
import courseRoutes from "../Controller/courseController.js";

// Add Course
router.post("/add", courseRoutes.addCourse);

// Delete Course
router.post("/delete", courseRoutes.deleteCourse);

// Edit Course
router.post("/edit", courseRoutes.editCourse);

export default router;
