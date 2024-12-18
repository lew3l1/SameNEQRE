const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db'); // Убедитесь, что путь к db.js верный

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
    },
}, {
    timestamps: true, // Автоматически добавляет createdAt и updatedAt
});

module.exports = User;
