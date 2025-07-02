import express from "express"
import { addContent } from "../controllers/userController"

const router = express.Router()

router.post("/content",addContent)