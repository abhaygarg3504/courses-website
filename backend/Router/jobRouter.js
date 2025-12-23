import express from 'express'
import jobRoutes from '../Controller/jobController.js';
import adminAuthenticated from '../Middleware/adminAuthentication.js';
const router = express.Router();

router.post("/add",adminAuthenticated ,jobRoutes.addJob);

router.post("/edit",adminAuthenticated ,jobRoutes.jobEdit);

router.post("/delete",adminAuthenticated ,jobRoutes.jobDelete);

router.get("/data",jobRoutes.jobData);

export default router;