const mysql = require('mysql2/promise');


const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: '_S5{713hOOan',
database: 'survey_sg',
});


module.exports = pool;