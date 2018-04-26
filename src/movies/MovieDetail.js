/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Poster } from './Movie';
import { getMovie, resetMovie, setMovie } from './actions';

import Rating from './Rating';

const POSTER_PATH_X1 = 'https://image.tmdb.org/t/p/w300';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  componentWillMount() {
    const { match, movies, setMovie } = this.props;
    movies.map((movie) => {
      if (movie.id.toString() === match.params.id) {
        return setMovie(movie);
      }
      return null;
    });
  }

  async componentDidMount() {
    const { getMovie, match } = this.props;
    getMovie(match.params.id);
  }

  componentWillUnmount() {
    this.props.resetMovie();
  }

  render() {
    const { movie, movies, match } = this.props;
    const film = movies.filter(movie => movie.id == match.params.id);
    return (
      <MovieWrapper>
        <MovieHeader backdrop={`${BACKDROP_PATH}${film[0].backdrop_path}`}>
          <MovieInfo>
            <Overdrive id={`${movie.id}`} duration={100}>
              <PosterSingle
                src={`${POSTER_PATH_X1}${film[0].poster_path}`}
                alt={movie.title}
              />
            </Overdrive>
            <div>
              <Rating rating={movie.vote_average} />
              <h1>{movie.title}</h1>
              <h3>{movie.tagline}</h3>
              <h4>Release date: {movie.release_date}</h4>
            </div>
          </MovieInfo>
        </MovieHeader>
        <MovieBody>
          <h3>Overview</h3>
          <MovieDescription>{movie.overview}</MovieDescription>
          <MovieLink href={movie.homepage}>
            Movie website{' '}
            <span role="img" aria-label="website">
              🌐
            </span>
          </MovieLink>
          <p>
            <b>Status: </b>
            {movie.status}
          </p>
        </MovieBody>
      </MovieWrapper>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  areLoaded: state.movies.moviesLoaded,
  movie: state.movies.movie,
  isLoaded: state.movies.movieLoaded,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovie,
      setMovie,
      resetMovie,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);

const MovieWrapper = styled.div`
  position: relative;
  background: white;
  min-height: calc(100vh - 100px);
`;

const MovieHeader = styled.div`
  position: relative;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 0;
`;

const MovieBody = styled.div`
  padding: 0 10% 1rem;
  text-align: left;
  @media (min-width: 720px) {
    text-align: center;
    padding: 3rem 10%;
  }
`;

const MovieInfo = styled.div`
  background: transparent;
  text-align: left;
  padding: 0 10%;
  display: flex;
  align-items: center;
  color: white;

  &:before {
    content: "";
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;
    backdrop-filter: blur(2px);
  }
  @media (max-width: 720px) {
    display: flex;
    flex-direction: column;
  }
  > div {
    margin: 0 20px;
    z-index: 3;
    text-shadow: black 1px 1px 3px;
    @media (max-width: 720px) {
      width: 100%;
    }
  }
`;

const PosterSingle = Poster.extend`
  @media (max-width: 720px) {
    margin: 20px auto 10px;
    width: 100%;
    max-width: 200px;
    display: inherit;
  }
  @media (min-width: 720px) {
    position: relative;
    top: 3rem;
    z-index: 3;
    transform: scale(1.1);
    transform-origin: bottom right;
  }
`;

const MovieLink = styled.a`
  text-decoration: none;
  font-weight: bold;
  text-align: left;
`;

const MovieDescription = styled.p`
  text-align: justify;
`;
