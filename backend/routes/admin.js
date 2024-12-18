const express = require('express');
const User = require('../models/User');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Получение всех пользователей
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновление пользователя
router.put('/users/:id', authMiddleware, adminMiddleware, async (req, res) => {
    const { username, email, role } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, email, role },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Ошибка обновления пользователя' });
    }
});

// Назначение администратора
router.post('/users/:id/make-admin', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: 'admin' },
            { new: true }
        );
        res.json({ message: 'Пользователь назначен администратором', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Ошибка назначения администратора' });
    }
});

module.exports = router;
