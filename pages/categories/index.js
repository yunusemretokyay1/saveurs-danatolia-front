import Header from "@/components/Header";
import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import ProductBox from "@/components/ProductBox";
import styled from "styled-components";

const ProductsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const CategoryWrapper = styled.div`
  margin-bottom: 40px; 
`;

export default function CategoriesPage({ categories }) {
    return (
        <>
            <Header />
            <Center>
                {categories.map((category) => (
                    <CategoryWrapper key={category._id}>
                        <Title>{category.name}</Title>
                        <ProductsList>
                            {category.products.length > 0 ? (
                                category.products.map((product) => (
                                    <ProductBox
                                        key={product._id}
                                        _id={product._id}
                                        title={product.title}
                                        price={product.price}
                                        images={product.images}
                                    />
                                ))
                            ) : (
                                <p>No products found in this category.</p>
                            )}
                        </ProductsList>
                    </CategoryWrapper>
                ))}
            </Center>
        </>
    );
}

export async function getServerSideProps() {
    await mongooseConnect();


    const categories = await Category.find().populate('parent');


    const categoriesWithProducts = await Promise.all(
        categories.map(async (category) => {
            const products = await Product.find({ category: category._id });
            return { ...category._doc, products };
        })
    );

    return {
        props: {
            categories: JSON.parse(JSON.stringify(categoriesWithProducts)),
        },
    };
}
