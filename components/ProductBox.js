// components/ProductBox.js
import styled from "styled-components";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext"; // Importing useWishlist

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative; /* For positioning the heart icon */
  
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  color: inherit;
  text-decoration: none;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;

  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;

const Heart = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${({ filled }) => (filled ? '#0D3D29' : 'none')}; /* Filled color */
  stroke: ${({ filled }) => (filled ? '#0D3D29' : '#C0C0C0')}; /* Gray if not filled */
  stroke-width: 2;
  cursor: pointer;
  position: absolute; /* Position the heart absolutely */
  top: 10px; /* Distance from the top */
  right: 10px; /* Distance from the right */
`;

const FlyingIcon = styled(CartIcon)`
  position: absolute;
  transition: transform 0.5s ease;
  z-index: 999; /* Ensure it is above other elements */
`;

export default function ProductBox({ _id, title, price, images }) {
  const { addProduct } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Get add and remove functions from WishlistContext
  const url = '/product/' + _id;

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.includes(_id);

  // Toggle wishlist status
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevent triggering the parent link
    e.preventDefault(); // Prevent any default link behavior
    if (isInWishlist) {
      removeFromWishlist(_id); // Remove from wishlist if already present
    } else {
      addToWishlist(_id); // Add to wishlist if not present
    }
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt={title} />
          <Heart onClick={handleWishlistClick} filled={isInWishlist}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </Heart>
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>€{price}</Price>
          <Button block onClick={() => addProduct(_id)} primary outline>
            <CartIcon /> Ajouter panier
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
