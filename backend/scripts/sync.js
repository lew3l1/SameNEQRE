const express = require('express');
const { connectDB, sequelize } = require('../config/db');
const User = require('../models/User'); // Подключаем модель для тестирования

const app = express();

// Middleware и маршруты...

(async () => {
    try {
        await connectDB(); // Подключаемся к базе данных
        await sequelize.sync(); // Синхронизируем модели с базой данных
        console.log('Database synchronized successfully.');

        // Дополнительно можно протестировать модель
        const admin = await User.create({
            username: 'admin',
            email: 'admin@example.com',
            password: 'admin123',
            role: 'admin',
        });
        console.log('Admin user created:', admin);
    } catch (error) {
        console.error('Database initialization error:', error.message);
    }
})();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
