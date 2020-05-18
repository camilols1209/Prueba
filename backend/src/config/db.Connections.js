var mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'database-syrus3g.cebo2t2acqgv.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'toxicoseyf',
        database: 'syrusDataBase'
    });
}