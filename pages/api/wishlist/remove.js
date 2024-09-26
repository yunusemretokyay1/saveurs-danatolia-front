import { mongooseConnect } from '@/lib/mongoose';
import { Wishlist } from '@/models/Wishlist';
import { getSession } from 'next-auth/react'; // Kullanıcı oturumunu almak için

export default async function handler(req, res) {
    await mongooseConnect();

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { productId } = req.body;

    // Kullanıcının istek listesinden ürün kaldır
    const wishlist = await Wishlist.findOne({ userId: session.user.id });
    if (wishlist) {
        wishlist.products = wishlist.products.filter(item => item.productId.toString() !== productId);
        await wishlist.save();
    }

    res.status(200).json({ message: 'Product removed from wishlist' });
}
