import { Request, Response } from "express";
import { ContentModel, LinkModel, UserModel } from "../models/db";
import { random } from "../utils/random";

export const addContent = async (req: Request, res: Response) => {
  try {
    const link = req.body.link;
    const type = req.body.type;
    const description= req.body.description;
    const title = req.body.title;

    const content = await ContentModel.create({
      title,
      link,
      type,
      description,
      // @ts-ignore
      userId: req.userId,
      tags: [],
    });

    res.json({ message: "Content Added" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserContent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const searchQuery = req.query.search as string;

    // Build a dynamic filter
    const filter: any = { userId };

    if (searchQuery) {
      filter.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive search
    }

    const content = await ContentModel.find(filter).populate("userId", "username");

    res.json({ content });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteUserContent = async (req: Request, res: Response) => {
  try {
    // console.log("Params:", req.params);
    const contentId = req.params.id;
    // @ts-ignore
    const userId = req.userId;

    const result = await ContentModel.deleteOne({
      _id: contentId,
      userId,
    });

    // console.log("DeleteOne result:", result);

    if (result.deletedCount === 0) {
      console.log("No document matched for deletion.");
      return res.status(404).json({ message: "No content found to delete." });
     }

    // console.log("Deleted successfully");
    res.json({ message: "Deleted content" });
  } catch (error: any) {
    console.log("Error in deleteUserContent:", error);
    res.status(500).json({ error: error.message });
  }
};


export const getSharedContent = async (req: Request, res: Response) => {
  const hash = req.params.shareLink;

  const link = await LinkModel.findOne({ hash });
  if (!link) {
    res.status(404).json({ message: "Invalid share link" });
    return;
  }

  const content = await ContentModel.find({
    userId: link.userId,
  });

  const user = await UserModel.findOne({
    _id: link.userId,
  });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  res.json({
    username: user.username,
    content,
  });
};

export const shareContentLink = async (req: Request, res: Response) => {
  const { share } = req.body;

  if (share) {
    const existingLink = await LinkModel.findOne({
      userId: req.userId,
    });

    if (existingLink) {
      res.json({ hash: existingLink.hash });
      return;
    }

    const hash = random(10);

    await LinkModel.create({
      userId: req.userId,
      hash,
    });

    res.json({ hash });
  } else {
    await LinkModel.deleteOne({ userId: req.userId });
    res.json({ message: "Removed link" });
  }
};


