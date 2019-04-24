import React from 'react';

const MoviesGridSampleHit = ({ toggleModal }) => (
    <div className={`col-sm-2 movie movie-sample`} onClick={() => toggleModal(true)}>
        <picture className="movie-picture" />
    </div>
);

export default MoviesGridSampleHit;