import React from 'react';
import styled from 'styled-components';
import StarIcon from '@/components/icons/StarIcon';

const RatingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const RatingRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    cursor: pointer; // Tıklanabilir olduğunu göster
`;

const Star = styled.div`
    margin-right: 2px;
`;

const Rating = ({ onRate }) => {
    const maxRating = 5;

    return (
        <RatingContainer>
            {[...Array(maxRating)].map((_, rowIndex) => {
                const currentRating = maxRating - rowIndex;

                return (
                    <RatingRow key={rowIndex} onClick={() => onRate(currentRating)}>
                        {[...Array(currentRating)].map((_, starIndex) => (
                            <Star key={starIndex}>
                                <StarIcon filled={true} />
                            </Star>
                        ))}
                    </RatingRow>
                );
            })}
        </RatingContainer>
    );
};

export default Rating;
