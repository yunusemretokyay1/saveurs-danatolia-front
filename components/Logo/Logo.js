// components/Logo/Logo.js
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import logoSrc from './logo.png';

const StyledLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 3;
  width: 50px; /* Çerçevenin düzgün olması için genişlik ve yükseklik ekliyoruz */
  height: 50px;
  border-radius: 100px; /* Tamamen yuvarlak yapmak için büyük bir değer kullanıyoruz */
  border: 2px solid #ccc; /* Çerçeve rengi ve kalınlığı */
  overflow: hidden; /* Görüntünün taşmasını engelliyoruz */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const Logo = () => (
    <Link href="/" passHref>
        <StyledLogo>
            <ImageWrapper>
                <Image
                    src={logoSrc}
                    alt="Logo"
                    layout="fill" /* Resmin tüm alanı kaplaması için */
                    objectFit="cover" /* Resmi çerçevenin içine sığdırmak için */
                />
            </ImageWrapper>
        </StyledLogo>
    </Link>
);
