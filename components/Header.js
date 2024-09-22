import Link from "next/link";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import BarsIcon from "@/components/icons/Bars";
import Center from "@/components/Center";
import SearchBar from "@/components/SearchBar";
import { Logo as LogoComponent } from "@/components/Logo/Logo";
import { useRouter } from 'next/router';
import CartIcon from "@/components/icons/CartIcon";

const StyledHeader = styled.header`
  background-color: #222;

`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  flex-grow: 1;
  display: flex; 
  justify-content: center; 
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const StyledNav = styled.nav`
  ${props => (props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `)}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;

  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  svg {
    width: 20px; 
    height: 20px; 
    margin-right: 5px; 
  }

  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/" passHref>
            <LogoComponent>Logo</LogoComponent>
          </Logo>

          <StyledNav mobileNavActive={mobileNavActive}>

            <SearchBar />

            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">All products</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/account">Account</NavLink>
            <NavLink href="/cart"><CartIcon />Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
