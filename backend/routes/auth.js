const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Убедитесь, что путь правильный
const router = express.Router();

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка на заполнение всех полей
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Проверка существующего пользователя
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Хэширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: newUser.id, username: newUser.username, email: newUser.email },
    });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ error: 'Error registering user', details: err.message });
  }
});

// Авторизация пользователя
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на заполнение полей
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Поиск пользователя в базе данных
    const user = await User.findOne({ where: { email } });

    // Проверка существования пользователя и корректности пароля
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Создание JWT токена
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'default_secret', // Добавлено значение по умолчанию для JWT_SECRET
      { expiresIn: '1h' }
    );

    // Возврат успешного ответа с токеном
    res.status(200).json({
      token,
      username: user.username,
      role: user.role,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Error logging in', details: err.message });
  }
});

module.exports = router;
