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

export default function ProductPage({ product, comments }) {
  const { addProduct } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <>
      <Header />
      <CenterContainer>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
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
                <Button primary onClick={() => addProduct(product._id, quantity)}>
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
