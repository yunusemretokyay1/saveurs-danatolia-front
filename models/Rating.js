import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    value: { type: Number, required: true, min: 1, max: 5 }, // Rating değeri 1 ile 5 arasında olmalı
    userName: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

const Rating = mongoose.models.Rating || mongoose.model("Rating", RatingSchema);
export { Rating };
