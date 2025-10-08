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
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).json({
        message: "Username and password are required",
      });
      return;
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      res.status(409).json({
        message: "Username is taken already",
      });
      return;
    }

    const newUser = await UserModel.create({ username, password });
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    res.status(201).json({
      message: "User signed up successfully",
      token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      res.status(400).json({
        message: "Username and password are required",
      });
      return;
    }

    let existingUser = await UserModel.findOne({ username, password });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, JWT_SECRET);

      res.status(200).json({ token });
    } else {
      res.status(403).json({
        message: "Incorrect Credentials",
      });
    }
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
