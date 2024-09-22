// components/icons/SearchIcon.js
import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  width: 24px; // Adjust the width as needed
  height: 24px; // Adjust the height as needed
  color: #aaa; // Change the color to a lighter shade
`;

const SearchIcon = () => (
    <StyledSvg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
    </StyledSvg>
);

export default SearchIcon;
