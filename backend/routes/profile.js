const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Модель пользователя
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Получение данных текущего пользователя
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

        res.json({
            username: user.username,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        console.error('Ошибка получения профиля:', error.message);
        res.status(500).json({ message: 'Ошибка получения данных профиля', error: error.message });
    }
});

// Обновление данных текущего пользователя
router.put('/', authMiddleware, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const updateFields = { username, email };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, { new: true }).select('-password');
        res.json({
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
        });
    } catch (error) {
        console.error('Ошибка обновления профиля:', error.message);
        res.status(500).json({ message: 'Ошибка обновления профиля', error: error.message });
    }
});

module.exports = router;
