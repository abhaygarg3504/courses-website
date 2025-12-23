import express from 'express'
import uploadRoutes from '../Controller/uploadController.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path'
import multer from 'multer';
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './TmpDocuments')
    },
    filename: function (req, file, cb) {
      const uniqueName = uuidv4();
      cb(null, uniqueName + path.extname(file.originalname))
    }
  })

const upload = multer({storage:storage})

router.post("/",upload.any(),uploadRoutes.uploadController)

router.get("/file/callback",uploadRoutes.callback)

export default router;