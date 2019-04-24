import React from 'react';

import { Highlight } from 'react-instantsearch-dom';

class MoviesGridHit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
            deleted: false
        };

        this.hover = this.hover.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const { onHoverMovie } = this.props;

        if (prevState.isHovered !== this.state.isHovered) {
            onHoverMovie(this.props.hit.objectID, this.state.isHovered);
        }
    }

    hover(hovered) {
        this.setState({ isHovered: hovered })
    }

    deleteMovie(objectID) {
        const { onDeleteMovie } = this.props;

        this.setState({ deleted: true }, () => onDeleteMovie(objectID));
    }

    render() {
        const { hit } = this.props;
        const { isHovered, deleted } = this.state;

        // To prevent refreshing the page/results on deletion, we just hide removed movie on a first place…
        if (deleted) {
            return false;
        }

        return (
            <div className={`col-sm-2 movie ${isHovered ? 'hovered' : 'not-hovered'}`}
                 onMouseOver={() => this.hover(true)}
                 onMouseOut={() => this.hover(false)}>
                <picture className="movie-picture">
                    <span className="movie-delete" onClick={() => this.deleteMovie(hit.objectID)}>✕</span>
                    <img src={hit.image}  alt={hit.title} />
                    <span className="movie-rating">★ {hit.rating}</span>
                </picture>
                <section className="movie-content">
                    <p className="movie-title">
                        <Highlight hit={hit} attribute="title" /> ({hit.year})
                    </p>
                    <p className="movie-genre">{hit.genre.join(', ')}</p>
                </section>
            </div>
        )
    }
}

export default MoviesGridHit;