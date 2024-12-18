const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'sameneqre',     // Имя базы данных
    process.env.DB_USER || 'root',    // Пользователь
    process.env.DB_PASSWORD || '',    // Пароль
    {
        host: process.env.DB_HOST || 'localhost', // Хост
        port: process.env.DB_PORT || 3306,        // Порт
        dialect: 'mysql',                         // Тип базы данных
        logging: false,                           // Отключить логирование
    }
);

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err) => console.error('Database connection error:', err));

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database using Sequelize!');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
