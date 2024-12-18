const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('Успешное подключение к базе данных!');
    await connection.end();
  } catch (error) {
    console.error('Ошибка подключения к базе данных:', error.message);
  }
})();
