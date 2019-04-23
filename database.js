const mysql = require('mysql');

const mysqlDb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'dashboard_assignment'
});

mysqlDb.connect(err => {
    if (err) {
        return console.error('[APP] Could not connect to MySQL.');
    }
});

module.exports = mysqlDb;