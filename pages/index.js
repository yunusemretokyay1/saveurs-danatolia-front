// pages/index.js
import { useState } from 'react';
import Header from "@/components/Header";
import Featured from "@/components/Featured";
import NewProducts from "@/components/NewProducts";
import ServiceModal from "@/components/ServiceModal";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";

export default function HomePage({ featuredProduct, newProducts }) {
  const [isModalOpen, setModalOpen] = useState(false); // State to manage modal visibility

  const toggleModal = () => {
    setModalOpen(true); // Open the modal when button is clicked
  };

  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} onButtonClick={toggleModal} /> {/* Pass the function to NewProducts */}
      <ServiceModal isOpen={isModalOpen} onRequestClose={() => setModalOpen(false)} /> {/* Modal component */}
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = '66f08779e5f71740a716496c';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, { sort: { '_id': -1 }, limit: 10 });
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
