const mysqlDb = require('../database');
const algoliaClient = require('../algolia');

const Actor = require('./Actor');
const Genre = require('./Genre');

const moviesIndex = algoliaClient.initIndex('movies');

const Movie = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('SELECT * FROM ??', ['movies'], (err, res, fields) => {
                if (err) {
                    reject(err);
                }

                resolve(res);
            })
        })
    },
    findById: id => {
        return new Promise((resolve, reject) => {
            // Get the Movie and its associated alternative titles, actors and genres…
            mysqlDb.query(
                'SELECT m.*, ' +
                'GROUP_CONCAT(DISTINCT mat.title) alternative_titles, ' +
                'GROUP_CONCAT(DISTINCT g.name) genre, ' +
                'GROUP_CONCAT(DISTINCT a.name) actors ' +
                'FROM movies m ' +
                'LEFT OUTER JOIN movies_alternative_titles mat ON m.id = mat.movie_id ' +
                'LEFT OUTER JOIN movies_genres mg ON m.id = mg.movie_id ' +
                'LEFT OUTER JOIN genres g ON mg.genre_id = g.id ' +
                'LEFT OUTER JOIN movies_actors ma ON m.id = ma.movie_id ' +
                'LEFT OUTER JOIN actors a ON ma.actor_id = a.id ' +
                'WHERE m.id = ? ' +
                'GROUP BY m.id LIMIT 1'
                , [id], (err, res, fields) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!res.length) {
                        return reject({ code: 'NOT_FOUND', error: err });
                    }

                    // MySQL data is returned separated by ',' we transform them to an array of string…
                    let movie = res[0];
                    if (movie.alternative_titles !== null) movie.alternative_titles = movie.alternative_titles.split(',');
                    if (movie.actors !== null) movie.actors = movie.actors.split(',');
                    if (movie.genre !== null) movie.genre = movie.genre.split(',');

                    resolve(movie);
                })
        })
    },
    create: (title, alternativeTitles, actors, genres, year, image, color, rating, score) => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('INSERT INTO movies SET ?', { title, year, image, color, rating, score }, async (err, res, fields) => {
                if (err) {
                    return console.error({ code: 'ERROR_ADD', error: err });
                }

                const movieId = res.insertId;

                // Add alternative titles to original one…
                if (Array.isArray(alternativeTitles) && alternativeTitles.length > 0) {
                    for (const alternativeTitle of alternativeTitles) {
                        await Movie.addAlternativeTitle(movieId, alternativeTitle)
                    }
                }

                // Add actors…
                if (Array.isArray(actors) && actors.length > 0) {
                    for (const actor of actors) {
                        const actorObj = await Actor.create(actor);
                        await Movie.addActorToMovie(movieId, actorObj.id);
                    }
                }

                // Add genres…
                if (Array.isArray(genres) && genres.length > 0) {
                    for (const genre of genres) {
                        const genreObj = await Genre.create(genre);
                        await Movie.addGenreToMovie(movieId, genreObj.id);
                    }
                }

                Movie.findById(movieId).then(movie =>
                    // Indexing movie in Algolia…
                    moviesIndex.addObject(movie, err => {
                        if (err) {
                            reject(err);
                        }

                        resolve(movie);
                    })
                );
            });
        });
    },
    addAlternativeTitle: (movieId, alternativeTitle) => {

        return new Promise((resolve, reject) => {
            mysqlDb.query('INSERT INTO movies_alternative_titles SET ?', { movie_id: movieId, title: alternativeTitle }, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    },
    addActorToMovie: (movieId, actorId) => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('INSERT INTO movies_actors SET ?', { movie_id: movieId, actor_id: actorId }, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res.insertId);
            });
        });
    },
    addGenreToMovie: (movieId, genreId) => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('INSERT INTO movies_genres SET ?', { movie_id: movieId, genre_id: genreId }, (err, res) => {
                if (err) {
                    reject(err);
                }

                resolve(res.insertId);
            });
        });
    },
    deleteById: id => {
        return new Promise((resolve, reject) => {
            // Deleting movie in database…
            mysqlDb.query('DELETE FROM movies WHERE id = ?', ['id'], (err, res, fields) => {
                if (err) {
                    reject(err);
                }

                // Removing movie from Algolia…
                moviesIndex.deleteObject(id, (err, content) => {
                    if (err) {
                        reject(err);
                    }

                    resolve();
                });
            })
        });
    }
};

module.exports = Movie;