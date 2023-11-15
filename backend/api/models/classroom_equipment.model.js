const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Classroom_Equipment = sequelize.define(
  'classrooms_equipments', 
{
    quantity: {
      type: DataTypes.INTEGER,
}
},
  { timestamps: false }  
)

module.exports = Classroom_Equipment
