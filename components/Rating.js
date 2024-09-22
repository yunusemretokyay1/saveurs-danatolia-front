import React from 'react';
import styled from 'styled-components';
import StarIcon from '@/components/icons/StarIcon';

const RatingContainer = styled.div`
    display: flex;
`;

const Star = styled.div`
    cursor: pointer;
    margin-right: 5px;
`;

const Rating = ({ onRate, rating }) => {
    const maxRating = 5;

    return (
        <RatingContainer>
            {[...Array(maxRating)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <Star key={index} onClick={() => onRate(starRating)}>
                        <StarIcon filled={starRating <= rating} />
                    </Star>
                );
            })}
        </RatingContainer>
    );
};

export default Rating;
