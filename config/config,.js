
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_mall'
});

connection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Koneksi berhasil');
    }
});

module.exports = connection;
