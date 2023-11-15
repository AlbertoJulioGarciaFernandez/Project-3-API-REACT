const { DataTypes } = require('sequelize')
const { sequelize } = require('../../database')

const Classroom = sequelize.define(
  'classroom',
  {
    classroomName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER
    },
    aimedAt: {
      type: DataTypes.ENUM('professor', 'student')
    }
  },
  { timestamps: false }
)

module.exports = Classroom

