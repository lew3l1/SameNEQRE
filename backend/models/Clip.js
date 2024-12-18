const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User'); // Для связи с пользователем

const Clip = sequelize.define('Clip', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        trim: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true,
    },
}, {
    timestamps: true, // Автоматическое добавление createdAt и updatedAt
});

// Связь: Clip принадлежит User
Clip.belongsTo(User, {
    foreignKey: {
        name: 'uploaderId',
        allowNull: false,
    },
    as: 'uploader',
});

// Связь: Многие к многим для лайков
Clip.belongsToMany(User, {
    through: 'ClipLikes', // Промежуточная таблица
    as: 'likes', // Псевдоним для пользователей, поставивших лайк
    foreignKey: 'clipId',
    otherKey: 'userId',
});

module.exports = Clip;
