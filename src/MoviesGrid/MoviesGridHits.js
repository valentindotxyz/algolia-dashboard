import React from 'react';
import { connectAutoComplete, Pagination } from 'react-instantsearch-dom';
import axios from 'axios';

import MoviesGridHit from './MoviesGridHit';
import MoviesGridSampleHit from './MoviesGridSampleHit';

import './movies-grid.scss';

class MovieHits extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredMovies: {}
        };

        this.onHoverMovie = this.onHoverMovie.bind(this);
        this.onDeleteMovie = this.onDeleteMovie.bind(this);
        this.atLeastOneMovieIsHovered = this.atLeastOneMovieIsHovered.bind(this);
    }

    onHoverMovie(movieObjectId, hovered) {
        this.setState(prevState => {
            const { prevHoveredMovies } = prevState;
            const hoveredMovies = { ...prevHoveredMovies, [movieObjectId]: hovered };
            return { hoveredMovies };
        });
    }

    atLeastOneMovieIsHovered() {
        const { hoveredMovies } = this.state;

        return Object.keys(hoveredMovies).some(movieObjectID => hoveredMovies[movieObjectID] === true);
    }

    onDeleteMovie(objectID) {
        axios
            .delete(`/api/1/movies/${objectID}`)
            .catch(() => alert('Something happened while deleting. Please retry.'));
    }

    render() {
        const { hits, currentRefinement, toggleModal } = this.props;

        return (
            <div className={`row movies ${this.atLeastOneMovieIsHovered() ? 'hovered' : 'not-hovered'}`}>
                {(currentRefinement === '' || !hits.length) &&
                    <MoviesGridSampleHit toggleModal={toggleModal} />
                }

                {hits.map(hit =>
                    <MoviesGridHit key={hit.objectID}
                                   hit={hit}
                                   onHoverMovie={this.onHoverMovie}
                                   onDeleteMovie={this.onDeleteMovie}
                    />)
                }

                <Pagination />
            </div>
        )
    }
}

export default connectAutoComplete(MovieHits);