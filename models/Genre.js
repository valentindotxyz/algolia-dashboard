const mysqlDb = require('../database');

const Genre = {
    findById: id => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('SELECT * FROM genres WHERE id = ? LIMIT 1', [id], (err, res, fields) => {
                if (err) {
                    reject(err);
                }

                if (!res.length) {
                    reject('Genre not found.');
                }

                resolve(res[0]);
            })
        })
    },
    findByName: name => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('SELECT * FROM genres WHERE name LIKE ?', [`%${name}%`], (err, res, fields) => {
                if (err) {
                    reject(err);
                }

                if (!res.length) {
                    reject('Genre not found.');
                }

                resolve(res[0]);
            })
        })
    },
    create: (name) => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('INSERT IGNORE INTO genres SET ?', { name }, (err, res, fields) => {
                if (err) {
                    console.log('Could not create Genre', err);
                    reject(err);
                }

                Genre.findByName(name).then(genre => resolve(genre));
            })
        })
    }
};

module.exports = Genre;