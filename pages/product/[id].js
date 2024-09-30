// components/ProductPage.js
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Comment as CommentModel } from "@/models/Comment";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import Button from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import { useContext, useState } from "react";
import { CartContext } from "@/components/CartContext";
import CommentsSection from "@/components/CommentsSection";
import { useWishlist } from "@/components/WishlistContext"; // Importing useWishlist

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

const QuantityInput = styled.input`
  width: 60px;
  padding: 5px;
  margin-right: 10px;
`;

const CenterContainer = styled(Center)`
  padding-top: 80px; 
`;

const Heart = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${({ filled }) => (filled ? '#0D3D29' : 'none')}; /* Filled color */
  stroke: ${({ filled }) => (filled ? '#0D3D29' : '#C0C0C0')}; /* Gray if not filled */
  stroke-width: 2;
  cursor: pointer;
  position: absolute; /* Position the heart absolutely */
  top: 20px; /* Distance from the top */
  right: 20px; /* Distance from the right */
`;

export default function ProductPage({ product, comments }) {
  const { addProduct } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist(); // Get add and remove functions from WishlistContext
  const [quantity, setQuantity] = useState(1);

  // Check if the product is already in the wishlist
  const isInWishlist = wishlist.includes(product._id);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  // Toggle wishlist status
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevent triggering other events
    e.preventDefault(); // Prevent any default link behavior
    if (isInWishlist) {
      removeFromWishlist(product._id); // Remove from wishlist if already present
    } else {
      addToWishlist(product._id); // Add to wishlist if not present
    }
  };

  return (
    <>

      <CenterContainer>
        <ColWrapper>
          <WhiteBox>
            <div style={{ position: 'relative' }}>
              <ProductImages images={product.images} />
              <Heart onClick={handleWishlistClick} filled={isInWishlist}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </Heart>
            </div>
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                <QuantityInput
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                />
                <Button primary outline onClick={() => addProduct(product._id, quantity)}>
                  <CartIcon /> Add to cart
                </Button>
              </div>
            </PriceRow>
            <CommentsSection comments={comments} productId={product._id} />
          </div>
        </ColWrapper>
      </CenterContainer>

    </>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;

  const product = await Product.findById(id);
  const comments = await CommentModel.find({ productId: id });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      comments: JSON.parse(JSON.stringify(comments)),
    },
  };
}
