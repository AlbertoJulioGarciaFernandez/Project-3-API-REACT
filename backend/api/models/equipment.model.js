const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Equipment = sequelize.define(
  'equipment',
  {
    equipmentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING
  }
},

  { timestamps: false }
)

module.exports = Equipment