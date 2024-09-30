import styled from "styled-components";
import Link from "next/link";
import { Logo as LogoComponent } from "@/components/Logo/Logo";

const FooterWrapper = styled.footer`
  background-color: #1a1a1a;
  color: white;
  padding: 20px 20px;
  text-align: center;
  margin-top: 40px; 
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 10px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 24px;
  transition: color 0.3s ease;

  &:hover {
    color: #00aaff;
  }
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-right: 15px;

  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  margin-top: 20px;
  font-size: 20px;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  position: relative;
  z-index: 3;
  flex-grow: 2;
  display: flex; 
  justify-content: center; 
  align-items: center; 
   margin-left: -50px;  
  font-size: 1.5rem; 
   width: 120px; 
`;

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterSection>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/categories">Categories</FooterLink>
          <FooterLink href="/account">Account</FooterLink>
          <FooterLink href="/cart">Cart</FooterLink>
        </FooterSection>

        <FooterSection>
          <Logo href="/" passHref>
            <LogoComponent>Logo</LogoComponent>
          </Logo>

        </FooterSection>

        <FooterSection>
          <h3>Contact</h3>
          <p>Email: info@example.com</p>
          <p>Phone: +123 456 7890</p>
        </FooterSection>
      </FooterContainer>

      <Copyright>
        &copy; {new Date().getFullYear()} SAVEURS D'ANATOLIE
      </Copyright>
    </FooterWrapper>
  );
}
