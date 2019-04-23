import React from 'react';

import { Highlight } from 'react-instantsearch-dom';

class MoviesGridHit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false
        };

        this.hover = this.hover.bind(this);
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

    render() {
        const { hit } = this.props;
        const { isHovered } = this.state;

        return (
            <div className={`col-sm-2 movie ${isHovered ? 'hovered' : 'not-hovered'}`}
                 onMouseOver={() => this.hover(true)}
                 onMouseOut={() => this.hover(false)}>
                <picture className="movie-picture">
                    <img src={hit.image} />
                    <span className="movie-rating">★ {hit.rating}</span>
                    <div className="movie-description">
                        With {hit.actors.join(', ')}.
                    </div>
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