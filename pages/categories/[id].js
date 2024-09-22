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
  gap: 20px; // Ürünler arası boşluk
  margin-top: 20px;
`;

export default function CategoryPage({ category, products }) {
    return (
        <>
            <Header />
            <Center>
                <Title>{category.name}</Title>
                <p>{category.description}</p>
                <ProductsList>
                    {products.length > 0 ? (
                        products.map((product) => (
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
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;

    // Kategoriyi al
    const category = await Category.findById(id);
    console.log('Category:', category);
    if (!category) {
        return {
            notFound: true,
        };
    }


    const products = await Product.find({ category: id });
    console.log('Products:', products);

    return {
        props: {
            category: JSON.parse(JSON.stringify(category)),
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}
