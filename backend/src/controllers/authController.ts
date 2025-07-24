import { Request, Response } from "express";
import { UserModel } from "../models/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}



export const signup = async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;

    try {

        const existingUser = await UserModel.findOne({ username });
        if(existingUser){
            res.json({
                message: "Username is taken already"
            })
            return;
        }
        const newUser = await UserModel.create({ username, password });

        const token = jwt.sign({ id: newUser._id }, JWT_SECRET);
         res.status(201).json({
            message: "User signed up successfully",
            token,
        });
        res.status(200).json({
            message: "User signed up",
        });
    } catch (error) {
        res.status(411).json({
            message: "Internal server error",
        });
    }
};


export const signin = async (req: Request, res: Response): Promise<void> => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
        const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

        res.status(200).json({ token });
    } else {
        res.status(403).json({
            message: "Incorrect Credentials",
        });
    }
};
