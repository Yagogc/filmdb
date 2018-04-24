import React from 'react';
import styled from 'styled-components';

const Rating = ({ rating, padded }) => {
  const formatedRating = Math.floor(rating / 2);
  const maxRate = 5;
  const stars = [];
  for (let i = 0; i < maxRate; i++) {
    if (i < formatedRating) {
      stars.push(
        <Star key={i} role="img" aria-label="star">
          ⭐
        </Star>,
      );
    } else {
      stars.push(
        <StarDimmed key={i} role="img" aria-label="star">
          ⭐
        </StarDimmed>,
      );
    }
  }
  return (
    <Wrapper padded={padded}>
      {stars} {formatedRating}/{maxRate}
    </Wrapper>
  );
};

export default Rating;

const Wrapper = styled.div`
  font-size: 12px;
  text-align: left;
  color: white;
  padding-left: ${props => (props.padded ? '5px' : '0')};
`;
const Star = styled.span`
  font-size: 14px;
`;
const StarDimmed = Star.extend`
  opacity: 0.5;
`;
