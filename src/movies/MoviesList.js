/* eslint react/no-did-mount-set-state: 0 */

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovies } from './actions';

class MoviesList extends PureComponent {
  async componentDidMount() {
    const { getMovies, isLoaded, moviesLoadedAt } = this.props;
    const oneHour = 60 * 60 * 1000;
    if (!isLoaded || new Date() - new Date(moviesLoadedAt) > oneHour) {
      getMovies();
    }
  }

  render() {
    const { movies } = this.props;
    return (
      <div>
        <ListHeader>
          <h1>Film Database</h1>
          <h2>
            Check the current films at your cinemas and the upcoming ones!
          </h2>
        </ListHeader>
        <ListContent>
          <h3>Last Added Films</h3>
          <MovieGrid>
            {movies.map(movie => <Movie key={movie.id} movie={movie} />)}
          </MovieGrid>
        </ListContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  isLoaded: state.movies.moviesLoaded,
  moviesLoadedAt: state.movies.moviesLoadedAt,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getMovies,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-row-gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 720px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ListHeader = styled.div`
  text-align: left;
  color: white;
  padding: 0 2rem;
  padding-bottom: 8rem;
  background-color: #111;
  overflow: hidden;
`;
const ListContent = styled.div`
  margin-top: -8rem;
  > h3 {
    color: white;
    text-align: left;
    padding: 0 2rem;
  }
`;
