const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Проверка авторизации
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Нет доступа, токен отсутствует' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Передаем данные пользователя в req.user
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Неверный токен' });
    }
};



// Проверка роли администратора
const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ error: 'Пользователь не авторизован' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Доступ запрещен' });
    }
    next();
};


module.exports = { authMiddleware, adminMiddleware };
