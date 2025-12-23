import express from "express";
const router = express.Router();
import courseRoutes from "../Controller/courseController.js";

// Course Router Data
router.get("/", courseRoutes.allCourses);

// Specific Course Data
router.get("/data/:id", courseRoutes.courseData);

// Search Course

router.get("/search" , courseRoutes.searchCourses)

// Similar course

router.get("/similar/courses",courseRoutes.similarCourses)

export default router;
