import React from 'react';

import MoviesSearch from './MoviesSearch';
import MoviesGridHits from './MoviesGridHits';

import './movies-grid.scss';

class MoviesGrid extends React.Component {
    render() {
        return (
            <React.Fragment>
                <MoviesSearch />
                <MoviesGridHits />
            </React.Fragment>
        )
    }
}

export default MoviesGrid;