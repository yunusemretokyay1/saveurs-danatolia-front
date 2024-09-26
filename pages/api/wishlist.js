import { mongooseConnect } from '@/lib/mongoose';
import { Wishlist } from '@/models/Wishlist';
import { getSession } from 'next-auth/react'; // Kullanıcı oturumunu almak için

export default async function handler(req, res) {
    await mongooseConnect();

    const session = await getSession({ req });
    if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Kullanıcının istek listesine ulaş
    const wishlist = await Wishlist.findOne({ userId: session.user.id }).populate('products.productId');

    res.status(200).json(wishlist);
}
