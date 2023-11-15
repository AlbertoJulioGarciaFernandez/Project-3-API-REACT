const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const User = sequelize.define(
  'user',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { // Email validation
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'buildingAdmin', 'professor', 'student'),
      defaultValue: 'student'
    }
  },
  { timestamps: false }
)

module.exports = User
