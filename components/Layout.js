// components/Layout.js
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styled from "styled-components";

const MainContent = styled.div`
  min-height: calc(100vh - 200px); /* Adjust based on your header/footer height */
`;

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <MainContent>{children}</MainContent>
            <Footer />
        </>
    );
}
