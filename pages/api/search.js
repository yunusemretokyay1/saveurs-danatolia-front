import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

const handler = async (req, res) => {
    await mongooseConnect();
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query is required' });
    }

    try {
        const results = await Product.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
        });
        console.log("Search results:", results);
        res.status(200).json(results);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

export default handler;
