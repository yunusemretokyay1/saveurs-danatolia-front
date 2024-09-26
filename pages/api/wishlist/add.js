import { mongooseConnect } from '@/lib/mongoose';
import { Wishlist } from '@/models/Wishlist';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
    await mongooseConnect();

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { productId } = req.body;


    const wishlist = await Wishlist.findOne({ userId: session.user.id });
    if (wishlist) {
        const exists = wishlist.products.some(item => item.productId.toString() === productId);
        if (!exists) {
            wishlist.products.push({ productId });
            await wishlist.save();
        }
    } else {
        await Wishlist.create({ userId: session.user.id, products: [{ productId }] });
    }

    res.status(200).json({ message: 'Product added to wishlist' });
}
