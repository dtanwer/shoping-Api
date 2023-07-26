import multer from "multer";
import express from "express";
import {uploadImage} from '../controller/upload.js'
const router = express.Router();

const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), uploadImage);


export default router;
