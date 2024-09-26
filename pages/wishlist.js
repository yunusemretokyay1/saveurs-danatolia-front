import { useEffect } from 'react';
import { useWishlist } from '@/components/WishlistContext';
import Center from '@/components/Center';
import WhiteBox from '@/components/WhiteBox';
import ProductBox from '@/components/ProductBox';
import Header from "@/components/Header";

export default function WishlistPage() {
    const { wishlist } = useWishlist();

    // Log the wishlist to inspect its contents
    console.log('Wishlist:', wishlist);

    return (
        <>
            <Header />
            <Center>
                <h1>Your Wishlist</h1>
                {wishlist.length === 0 ? (
                    <p>Your wishlist is empty.</p>
                ) : (
                    wishlist.map((item, index) => {
                        // Check if item is not null and has a productId
                        if (item && item.productId) {
                            return (
                                <WhiteBox key={item.productId}>
                                    <ProductBox productId={item.productId} />
                                </WhiteBox>
                            );
                        } else {
                            console.warn(`Item at index ${index} is invalid`, item);
                            return null; // Return null for invalid items
                        }
                    })
                )}
            </Center>
        </>
    );
}
