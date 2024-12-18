const express = require('express');
const router = express.Router();

// Пример маршрута для получения списка стримов
router.get('/', (req, res) => {
  res.send('List of live streams will be displayed here');
});

module.exports = router;
