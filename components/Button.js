import styled, { css } from "styled-components";
import { primary } from "@/lib/colors"; // Import your primary color

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;

  svg {
    height: 16px;
    margin-right: 5px;
    color: white; // Ensure the icon color is white when the button is primary
  }

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}

  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}

  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}

  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}

  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}

  ${props => props.primary && !props.outline && css`
    background-color: ${primary}; // Use your specific color for the background
    border: 1px solid ${primary};
    color: #fff; // Keep text color white
  `}

  ${props => props.primary && props.outline && css`
    background-color: transparent; // No background for outline
    border: 1px solid ${primary}; // Border color
    color: ${primary}; // Text color
     &:hover {
    background-color: #d0d5cb; /* Darker shade on hover */
  }
  `}

  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 20px;
    }
  `}
  

  ${props => props.size === 'l' && css`
    font-size: 1.2rem;
    padding: 10px 20px;
    svg {
      height: 20px;
    }
  `}

`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;


export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}
