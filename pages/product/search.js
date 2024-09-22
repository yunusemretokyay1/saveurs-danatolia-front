// pages/api/products/search.js

import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';

export default async function handler(req, res) {
    await mongooseConnect();

    const { query } = req.query;

    if (req.method === 'GET') {
        try {
            const products = await Product.find({
                title: { $regex: query, $options: 'i' },
            });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
