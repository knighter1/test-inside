const mysql = require('mysql2/promise');
const { MYSLQ_ROOT_PASSWORD } = require('../../config');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: MYSLQ_ROOT_PASSWORD,
    database: 'test_database'
});

pool.getConnection((err, connection) => {
    
    if (err) {
        console.error(err.code)
    }
  
    if (connection) {
        connection.release()
    }

    return;
});
  
module.exports = pool;