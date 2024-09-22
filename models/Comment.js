import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    userName: { type: String, required: true }, // Zorunlu
    text: { type: String, required: true },
    rating: { type: Number, required: true },
});

const Comment = mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export { Comment };
