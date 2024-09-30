import { useEffect } from 'react';
import { useWishlist } from '@/components/WishlistContext';
import Center from '@/components/Center';
import WhiteBox from '@/components/WhiteBox';
import ProductBox from '@/components/ProductBox';


export default function WishlistPage() {
    const { wishlist } = useWishlist();

    console.log('Wishlist:', wishlist);

    return (
        <>

            <Center>
                <h1>Your Wishlist</h1>
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlist.map((item, index) => {

                        if (item && item.productId) {
                            return (
                                <WhiteBox key={item.productId}>
                                    <ProductBox productId={item.productId} />
                                </WhiteBox>
                            );
                        } else {
                            console.warn(`Item at index ${index} is invalid`, item);
                            return null;
                        }
                    })
                )}
            </Center>
        </>
    );
}
