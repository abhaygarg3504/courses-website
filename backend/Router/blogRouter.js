import express from 'express'
import blogController from '../Controller/blogController.js';

const router = express.Router();

router.post("/post",blogController.blogPost);



export default router;