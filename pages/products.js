import Header from "@/components/Header";
import styled from "styled-components";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";
import { Rating } from "@/models/Rating";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { useState } from "react";

const PageContainer = styled.div`
  padding: 20px;
`;

const CenterContainer = styled(Center)`
  padding-top: 80px; 
  display: flex;
  flex-direction: column; 
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const FilterContainer = styled.div`
  flex: 1; /* Eşit şekilde yayılma */
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center; /* Dikey merkezleme */
  margin-left: 20px; /* Sağdaki boşluk */
`;

export default function ProductsPage({ products, categories, ratings }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('price');

  const productsWithRating = products.map(product => {
    const productRatings = ratings.filter(rating => rating.productId.toString() === product._id.toString());
    const avgRating = productRatings.reduce((sum, rating) => sum + rating.value, 0) / (productRatings.length || 1);
    return { ...product, avgRating };
  });

  const filteredProducts = productsWithRating.filter(product =>
    !selectedCategory || product.category.toString() === selectedCategory
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'date') {
      return sortOrder === 'asc' ? new Date(a.createdAt) - new Date(b.createdAt) : new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'rating') {
      return sortOrder === 'asc' ? a.avgRating - b.avgRating : b.avgRating - a.avgRating;
    }
    return 0;
  });

  return (
    <PageContainer>
      <Header />
      <CenterContainer>
        <Title>All Products</Title>

        <FiltersContainer>
          <FilterContainer>
            <select onChange={e => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FilterContainer>

          <SortContainer>
            <select onChange={e => setSortBy(e.target.value)}>
              <option value="price">Sort by Price</option>
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>

            <select onChange={e => setSortOrder(e.target.value)}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </SortContainer>
        </FiltersContainer>

        <ProductsGrid products={sortedProducts} />
      </CenterContainer>
    </PageContainer>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();

  const products = await Product.find().lean();
  const categories = await Category.find().lean();
  const ratings = await Rating.find().lean();

  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      ratings: JSON.parse(JSON.stringify(ratings)),
    },
  };
}
