var mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'syrus.cjmrqwjdxtrf.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'qwertyuiop',
        database: 'syrusDataBase'
    });
}