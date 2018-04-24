import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';

const Movie = ({ movie }) => (
  <Wrapper to={`/${movie.id}`}>
    <Overdrive id={`/${movie.id}`}>
      <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
    </Overdrive>
    <Rating>
      <Star role="img" aria-label="star">
        ⭐
      </Star>
      {movie.vote_average}/10
    </Rating>
    <Title>{movie.title}</Title>
  </Wrapper>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
  box-shadow: 0 0 35px black;
  transition: transform 0.3s ease-in-out;
`;

export const Star = styled.span`
  font-size: 14px;
`;
export const Title = styled.h2`
  color: white;
  font-size: 18px;
  padding: 0 10px;
  text-align: left;
  margin: 7px 0;
`;
export const Rating = styled.p`
  color: white;
  padding: 0 10px;
  text-align: left;
  margin: 7px 0;
  font-size: 12px;
`;
export const Wrapper = styled(Link)`
  text-decoration: none;
  transition: transform 0.2s ease-in-out;

  &:hover {
    ${Poster} {
      transform: scale3D(1.02, 1.02, 1.02) rotate(-2deg);
    }
  }
`;
