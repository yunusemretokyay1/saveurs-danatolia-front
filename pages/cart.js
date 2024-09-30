import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Center from "@/components/Center";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import ServiceModal from "@/components/ServiceModal";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;

  img {
    max-width: 60px;
    max-height: 60px;
  }

  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;

    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;

  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart, setCartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState({ date: null, time: '' });
  const [shippingCost, setShippingCost] = useState(0);

  useEffect(() => {
    const fetchShippingCost = async () => {
      try {
        const response = await axios.get('/api/settings');
        setShippingCost(response.data.shippingLimit);
      } catch (error) {
        console.error('Erreur lors de la récupération du coût d\'expédition :', error);
      }
    };

    fetchShippingCost();
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts })
        .then(response => {
          setProducts(response.data);
        });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
      console.log('Panier vidé après la commande réussie');
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const removeItemFromCart = (id) => {
    setCartProducts(cartProducts.filter(productId => productId !== id));
  };

  const goToPayment = async () => {
    if (!selectedDateTime.date || !selectedDateTime.time) {
      alert("Veuillez sélectionner une date et une heure.");
      return;
    }

    const [hours, minutes] = selectedDateTime.time.split(':').map(Number);
    const fullDateTime = new Date(selectedDateTime.date);
    fullDateTime.setHours(hours);
    fullDateTime.setMinutes(minutes);

    try {
      const response = await axios.post('/api/checkout', {
        name,
        email,
        city,
        postalCode,
        streetAddress,
        country,
        cartProducts,
        service: selectedService?.service,
        location: selectedService?.location,
        dateTime: fullDateTime.toISOString(),
      });

      if (response.data.url) {
        clearCart();
        window.location = response.data.url;
      }
    } catch (error) {
      console.error('Erreur de paiement :', error);
    }
  };

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find(p => p._id === productId)?.price || 0;
    total += price;
  }

  total += shippingCost;

  if (isSuccess) {
    return (
      <Center>
        <ColumnsWrapper>
          <Box>
            <h1>Merci pour votre commande !</h1>
            <p>Nous vous enverrons un email lorsque votre commande sera expédiée.</p>
          </Box>
        </ColumnsWrapper>
      </Center>
    );
  }

  return (
    <Center>
      <ColumnsWrapper>
        <Box>
          <h2>Panier</h2>
          {!cartProducts.length && <div>Votre panier est vide</div>}
          {products.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Quantité</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <ProductInfoCell>
                      <ProductImageBox>
                        <img src={product.images[0]} alt={product.title} />
                      </ProductImageBox>
                      {product.title}
                    </ProductInfoCell>
                    <td>
                      <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                      <QuantityLabel>
                        {cartProducts.filter(id => id === product._id).length}
                      </QuantityLabel>
                      <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                    </td>
                    <td>
                      €{cartProducts.filter(id => id === product._id).length * product.price}
                    </td>
                    <td>
                      <Button onClick={() => removeItemFromCart(product._id)}>Supprimer</Button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td>Coût d'expédition :</td>
                  <td>€{shippingCost.toFixed(2)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>Total : €{total.toFixed(2)}</td>
                </tr>
              </tbody>
            </Table>
          )}
          {cartProducts.length > 0 && (
            <Button black onClick={clearCart} style={{ marginTop: '20px' }}>
              Vider le panier
            </Button>
          )}
        </Box>
        {!!cartProducts.length && (
          <Box>
            <Button black block onClick={() => setIsModalOpen(true)}>
              Sélectionner un service
            </Button>
            <h2>Informations de commande</h2>
            <Input type="text"
              placeholder="Nom"
              value={name}
              onChange={ev => setName(ev.target.value)} />
            <Input type="text"
              placeholder="Email"
              value={email}
              onChange={ev => setEmail(ev.target.value)} />
            <CityHolder>
              <Input type="text"
                placeholder="Ville"
                value={city}
                onChange={ev => setCity(ev.target.value)} />
              <Input type="text"
                placeholder="Code postal"
                value={postalCode}
                onChange={ev => setPostalCode(ev.target.value)} />
            </CityHolder>
            <Input type="text"
              placeholder="Adresse"
              value={streetAddress}
              onChange={ev => setStreetAddress(ev.target.value)} />
            <Input type="text"
              placeholder="Pays"
              value={country}
              onChange={ev => setCountry(ev.target.value)} />
            <Button black block onClick={goToPayment}
              disabled={!selectedService || !name || !email || !city || !postalCode || !streetAddress || !country}>
              Continuer vers le paiement
            </Button>
          </Box>
        )}
      </ColumnsWrapper>
      <ServiceModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onServiceSelect={service => {
          setSelectedService(service);
          setSelectedDateTime({
            date: service.dateTime,
            time: service.time
          });
        }}
      />
    </Center>
  );
}
