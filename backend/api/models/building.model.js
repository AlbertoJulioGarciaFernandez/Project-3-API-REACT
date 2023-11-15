const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Building = sequelize.define(
  'building',
  {
    buildingName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING
    },
    providedServices: {
      type: DataTypes.STRING
    }
  },
  { timestamps: false }
)

module.exports = Building
