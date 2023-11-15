const { DataTypes } = require('sequelize'),
  { sequelize } = require('../../database'),
  { getTodaysDate } = require('../middleware/index.js');

const Booking = sequelize.define(
  'booking',
  {
    bookingDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { // Date validation
        isAfter: { args: getTodaysDate(), msg: 'An error has occurred. +Info: The date must be a date greater than today\'s!' }
      }
    },
    bookingTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
)

module.exports = Booking
