const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Для связи с пользователем

const Stream = sequelize.define('Stream', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true, // Указывает, что поле должно быть очищено от лишних пробелов
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
    isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    viewers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true, // Автоматическое добавление createdAt и updatedAt
});

// Связь: Stream принадлежит User
Stream.belongsTo(User, {
    foreignKey: {
        name: 'streamerId',
        allowNull: false,
    },
    as: 'streamer',
});

module.exports = Stream;
