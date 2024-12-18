const express = require('express');
const { Streams } = require('../models'); // Используем модель Streams из вашей базы данных

const router = express.Router();

// Получить список всех стримов
router.get('/', async (req, res) => {
    try {
        const streams = await Streams.findAll();
        res.json(streams);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Получить информацию о конкретном стриме
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const stream = await Streams.findByPk(id);

        if (!stream) {
            return res.status(404).json({ error: 'Стрим не найден' });
        }

        res.json(stream);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Обновить статус стрима (например, включить live)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { isLive, viewers } = req.body;

        const stream = await Streams.findByPk(id);

        if (!stream) {
            return res.status(404).json({ error: 'Стрим не найден' });
        }

        stream.isLive = isLive !== undefined ? isLive : stream.isLive;
        stream.viewers = viewers !== undefined ? viewers : stream.viewers;
        await stream.save();

        res.json(stream);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
