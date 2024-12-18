
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/db');

// Подключение маршрутов
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const streamRoutes = require('./routes/streams');
const clipRoutes = require('./routes/clips');
const profileRoutes = require('./routes/profile');
const streamRoutes = require('./routes/stream');

// Подключение к базе данных
connectDB();

const app = express();
console.log('Server is running'); // Проверка запуска

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Настройка CORS
app.use(bodyParser.json()); // Поддержка JSON в запросах

// Подключение маршрутов
app.use('/api/auth', authRoutes); // Аутентификация
app.use('/api/admin', adminRoutes); // Панель администратора
app.use('/api/streams', streamRoutes); // Управление стримами
app.use('/api/clips', clipRoutes); // Управление клипами
app.use('/api/profile', profileRoutes); // Профиль пользователя

// Базовый маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Welcome to the SameNEQRE streaming platform API');
});

// Обработчик ошибок (Middleware)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.use(express.json());

// Подключение маршрутов
app.use('/api/streams', streamRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


