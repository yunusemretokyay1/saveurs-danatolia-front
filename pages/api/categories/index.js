import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();

    if (req.method === 'GET') {
        try {
            const categories = await Category.find().populate('parent');

            const categoriesWithProducts = await Promise.all(
                categories.map(async (category) => {
                    const products = await Product.find({ category: category._id });
                    return { ...category._doc, products };
                })
            );

            res.status(200).json(categoriesWithProducts);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories and products' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
