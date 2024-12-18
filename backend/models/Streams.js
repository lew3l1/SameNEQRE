const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Streams = sequelize.define('Streams', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    isLive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    viewers: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    streamerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Streams;
