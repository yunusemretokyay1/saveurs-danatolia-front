// components/NewProducts.js
import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: normal;
  display: flex;
  justify-content: space-between; /* Align items to the edges */
  align-items: center; /* Center vertically */
`;



export default function NewProducts({ products, onButtonClick }) {
  return (
    <Center>
      <Title>
        New Arrivals

      </Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
