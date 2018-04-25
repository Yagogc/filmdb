import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import Rating from './Rating';

const POSTER_PATH_X1 = 'https://image.tmdb.org/t/p/w154';
const POSTER_PATH_X2 = 'https://image.tmdb.org/t/p/w300';

const Movie = ({ movie }) => (
  <Wrapper to={`/${movie.id}`}>
    <Overdrive id={`/${movie.id}`}>
      <Poster>
        <img
          src={`${POSTER_PATH_X1}${movie.poster_path}`}
          srcSet={`${POSTER_PATH_X2}${movie.poster_path} 2x`}
          alt={movie.title}
        />
      </Poster>
    </Overdrive>
    <Info>
      <Rating rating={movie.vote_average} padded />
      <Title>{movie.title}</Title>
    </Info>
  </Wrapper>
);

export default Movie;

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.picture`
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;
  > img {
    box-shadow: 0 0 35px black;
  }
`;

export const Title = styled.h2`
  color: white;
  font-size: 18px;
  padding: 0 10px;
  text-align: left;
  margin: 7px 0;
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

const Info = styled.div`
  max-width: 154px;
  margin: 0 auto;
`;
