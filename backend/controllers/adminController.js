  const User = require('../models/User');

  // Получить список всех пользователей
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-password'); // Исключаем поле пароля
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching users', details: err.message });
    }
  };

  // Удаление пользователя
  exports.deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Error deleting user', details: err.message });
    }
  };
