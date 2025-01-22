import express from "express"
import { UserModel } from "./db";
import { userMiddleware } from "./middlewares";

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

    res.josn ({
        message: " Deleted Successfully"
    })

})


app.post("/api/v1/brain/share", (req, res) =>{

})

app.get("api/v1/brain/:sharelink", (req,res) =>{

})

app.listen(3000);