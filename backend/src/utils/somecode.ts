import express from "express";
import { LinkModel, UserModel,ContentModel  } from ""
import { userMiddleware } from "./middlewares";
import jwt from "jsonwebtoken";
import { random } from "secrets.js-grempe";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    await UserModel.create({
        username: username,
        password: password
    })

    res.json({
        message: "User signed up"
    })
 //todo zod and to do hashing password using bycrpt
})

app.post("/api/v1/signin", async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })
    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        },JWT_PASSWORD)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message: "incorrect credentials"
        })
    }

})

app.post("/api/v1/content", userMiddleware,async(req, res) =>{
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link,
        type,
        userId: req.userId,
        tags:[]

    })


})

app.get("/api/v1/content", userMiddleware, async(req, res) =>{
    const userId = req.userId;
    const content = await ContentModel.find({
        userId : userId
    }) populate("userId")
    res.json({
        content
    })


})


app.delete("/api/v1/content", userMiddleware, async(req, res) =>{

    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    })

    res.json ({
        message: " Deleted Successfully"
    })

})


app.post("/api/v1/brain/share", userMiddleware, async(req, res) =>{
    const share = req.body.share;
    if (share){
        await LinkModel.create({
            userId: req.userId,
            hash: random(10)

        })
    }else {
        await LinkModel.deleteOne({
            userId: req.userId
        });
    }

})

app.get("api/v1/brain/:sharelink", (req, res) =>{
    const hash = req.params.sharelink;

    const link = await LinkModel.findOne({
        hash

    });

    if (!link){
        res.status(411).json({
            message: " Sorry incorrected input"
        })
        return ;
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        userId: link.userId
    })

    if(!user){
        res.status(411).json({
            message: " user not found , error should ideally not happen"
        })
        return;
    }

    res.json({
        username: user.username,
        content: content
    })

})

app.listen(3000);