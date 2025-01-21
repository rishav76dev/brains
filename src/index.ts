import express from "express"
import { UserModel } from "./db";

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

app.post("/api/v1/content", (req, res) =>{

})

app.get("/api/v1/content", (req, res) =>{

})


app.delete("/api/v1/content", (req, res) =>{

})


app.post("/api/v1/brain/share", (req, res) =>{

})

app.get("api/v1/brain/:sharelink", (req,res) =>{

})

app.listen(3000);