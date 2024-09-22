import { mongooseConnect } from "@/lib/mongoose";
import { Comment } from "@/models/Comment";

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === "POST") {
        const { productId, userName, text, rating } = req.body;
        const newComment = new Comment({ productId, userName, text, rating });
        await newComment.save();
        return res.status(201).json(newComment);
    }


    if (req.method === "GET") {
        const { productId } = req.query;
        const comments = await Comment.find({ productId });
        return res.status(200).json(comments);
    }


    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
}
