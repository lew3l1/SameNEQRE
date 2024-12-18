const express = require('express');
const router = express.Router();

// Пример маршрута для получения списка клипов
router.get('/', (req, res) => {
  res.send('List of video clips will be displayed here');
});

module.exports = router;
