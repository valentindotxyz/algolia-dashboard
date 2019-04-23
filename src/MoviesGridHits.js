import React from 'react';
import { connectInfiniteHits } from 'react-instantsearch-dom';
import MoviesGridHit from './MoviesGridHit';

class MovieHits extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredMovies: {}
        };

        this.onHoverMovie = this.onHoverMovie.bind(this);
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

    render() {
        const { hits, hasMore, refine } = this.props;

        return (
            <div className={`row movies ${this.atLeastOneMovieIsHovered() ? 'hovered' : 'not-hovered'}`}>
                {hits.map(hit => <MoviesGridHit key={hit.objectID} hit={hit} onHoverMovie={this.onHoverMovie} />)}
            </div>
        )
    }
}

export default connectInfiniteHits(MovieHits);