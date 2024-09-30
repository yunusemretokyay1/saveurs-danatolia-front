// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "@/components/CartContext";
import { WishlistProvider } from "@/components/WishlistContext";
import { AuthProvider } from "@/components/AuthContext";
import Layout from "@/components/Layout"; // Layout'u ekliyoruz

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <CartContextProvider>
          <WishlistProvider>
            <Layout>
              <Component {...pageProps} /> {/* Tüm sayfalar Layout ile sarılacak */}
            </Layout>
          </WishlistProvider>
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}
