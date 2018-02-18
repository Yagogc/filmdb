/* eslint react/no-did-mount-set-state: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

import {connect} from 'react-redux';
import { bindActionCreators} from 'redux';
import {getMovie, resetMovie, setMovie} from './actions'

const POSTER_PATH = 'https://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {

	componentWillMount() {
		const {match, movies, setMovie} = this.props;
		movies.map(function(movie){
			if (movie.id.toString() === match.params.id) {
				return setMovie(movie);
			}
			return null
		})
	}

  async componentDidMount() {
	const {getMovie, match} = this.props;
	getMovie(match.params.id);
  }
  
  componentWillUnmount() {
	this.props.resetMovie();
  }

  render() {
    const { movie } = this.props;
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={`/${movie.id}`}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={movie.title} />
          </Overdrive>
          <div>
            <h1>{movie.title}</h1>
            <h3>{movie.release_date}</h3>
            <p>{movie.overview}</p>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

const mapStateToProps = state => ({
	movies: state.movies.movies,
	areLoaded: state.movies.moviesLoaded,
	movie: state.movies.movie,
	isLoaded: state.movies.movieLoaded,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
	getMovie,
	setMovie,
	resetMovie
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);


const MovieWrapper = styled.div`
    position: relative;
    padding-top: 50vh;
    background: url(${props => props.backdrop}) no-repeat;
    background-size:cover;
`;

const MovieInfo = styled.div`
    background: white;
    text-align: left;
    padding: 2rem 10%;
    display: flex;
    align-items: flex-start;

    > div {
        margin-left: 20px;
    }
    img {
        position: relative;
        top: -5rem;
    }
`;
