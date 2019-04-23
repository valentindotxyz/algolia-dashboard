import React from 'react';

import MoviesSearch from './MoviesSearch/MoviesSearch';
import MoviesGridHits from './MoviesGrid/MoviesGridHits';

const Home = ({ toggleModal }) => (
    <React.Fragment>
        <MoviesSearch />
        <MoviesGridHits toggleModal={toggleModal} />
    </React.Fragment>
);

export default Home;