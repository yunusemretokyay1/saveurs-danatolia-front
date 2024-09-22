import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { mongooseConnect } from "@/lib/mongoose";

export default async function handler(req, res) {
    await mongooseConnect();
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const category = await Category.findById(id).populate('parent');
            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }

            const products = await Product.find({ category: id });
            res.status(200).json({ category, products });
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch category and products' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
