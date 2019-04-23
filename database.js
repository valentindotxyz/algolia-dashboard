const args = require('minimist')(process.argv.slice(2));
const mysql = require('mysql');

const mysqlDb = mysql.createConnection({
    host: args.db_host,
    user: args.db_user,
    password: args.db_password,
    database: args.db_database
});

mysqlDb.connect(err => {
    if (err) {
        return console.error('[APP] Could not connect to MySQL.');
    }
});

module.exports = mysqlDb;