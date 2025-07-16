import express from "express"
import { addContent, deleteUserContent, getSharedContent, getUserContent, shareContentLink } from "../controllers/userController"
import { userMiddleware } from "../middleware/middlewares";

const router = express.Router()

router.post("/content",userMiddleware, addContent);


router.get("/content",userMiddleware, getUserContent);


router.delete("/content/:id", userMiddleware,deleteUserContent);



router.post("/brain/share", userMiddleware , shareContentLink);

router.get("/brain/:shareLink", getSharedContent);

export default router;
