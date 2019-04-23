import React from 'react';

const MoviesGridSampleHit = ({ toggleModal }) => (
    <div className={`col-sm-2 movie movie-sample`} onClick={() => toggleModal(true)}>
        <picture className="movie-picture" />
        <section className="movie-content">
            <p className="movie-title">
                Add a movie…
            </p>
        </section>
    </div>
);

export default MoviesGridSampleHit;