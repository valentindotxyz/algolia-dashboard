const mysql = require('mysql');

// Create a MySQL connection available for all the application…
const mysqlDb = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'dashboard_assignment'
});

mysqlDb.connect(err => {
    if (err) {
        return console.error('[APP] Could not connect to MySQL.');
    }
});

module.exports = mysqlDb;