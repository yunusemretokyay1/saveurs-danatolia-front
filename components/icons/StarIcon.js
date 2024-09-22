import React from 'react';

const StarIcon = ({ filled }) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={filled ? '#0D3D29' : 'none'}
            stroke="#0D3D29"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15 8.5 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 8.5 12 2" />
        </svg>
    );
};

export default StarIcon;
