// Модуль для работы с БД MySQL

const mysql = require('mysql2/promise');
const { MYSLQ_ROOT_PASSWORD } = require('../../config');
const host = process.env.DB_HOST || 'localhost';

// Подключаемся к БД
const pool = mysql.createPool({
    connectionLimit: 10,
    host,
    user: 'root',
    password: MYSLQ_ROOT_PASSWORD,
    database: 'test_database'
});

// Создаем пул соединений
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
