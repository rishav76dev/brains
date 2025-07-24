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



export const deleteUserContent = async (req: Request, res: Response): Promise<void> => {
    try {
        const contentId = req.params.id;
        const userId = (req as any).userId as string; // Cast explicitly if `userId` is attached in auth middleware

        const result = await ContentModel.deleteOne({ _id: contentId, userId });

        if (result.deletedCount === 0) {
            console.warn(`No content found for deletion with id ${contentId} for user ${userId}.`);
            res.status(404).json({ success: false, message: "No content found to delete." });
            return;
        }

        res.json({ success: true, message: "Content deleted successfully." });
    } catch (error: unknown) {
        console.error("Error deleting user content:", error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
        });
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


