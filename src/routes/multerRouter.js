import { Router } from "express";
import { insertImg } from "../controllers/multerController.js";
import upload from "../config/multer.js";
const multerRouter = Router()

multerRouter.post('/', upload.single('product'), insertImg)

export default multerRouter