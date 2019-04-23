const mysqlDb = require('../database');

const Actor = {
    findById: id => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('SELECT * FROM actors WHERE id = ? LIMIT 1', [id], (err, res, fields) => {
                if (err) {
                    reject(err);
                }

                if (!res.length) {
                    reject('Actor not found,');
                }

                resolve(res[0]);
            })
        })
    },
    findByName: name => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('SELECT * FROM actors WHERE name LIKE ?', [`%${name}%`], (err, res, fields) => {
                if (err) {
                    reject(err);
                }

                if (!res.length) {
                    reject('Actor not found,');
                }

                resolve(res[0]);
            })
        })
    },
    create: (name, image) => {
        return new Promise((resolve, reject) => {
            mysqlDb.query('INSERT IGNORE INTO actors SET ?', { name, image }, (err, res, fields) => {
                if (err) {
                    console.log('Could not create Actor.', err);
                    reject(err);
                }

                Actor.findByName(name).then(actor => resolve(actor));
            })
        })
    }
};

module.exports = Actor;