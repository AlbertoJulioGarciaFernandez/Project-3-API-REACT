const User = require('../api/models/user.model.js')
const Classroom_Equipment = require('../api/models/classroom_equipment.model.js')
const Booking = require('../api/models/booking.model.js')
const Building = require('../api/models/building.model.js')
const Classroom = require('../api/models/classroom.model.js')
const Equipment = require('../api/models/equipment.model.js')

function addRelationsToModels() {
  try {

    // One to one
    // A person manages one building (faculty) and one building can be
    // managed by only one person.
    User.hasOne(Building, { foreignKey: { unique: true } }); // Source
    Building.belongsTo(User); // Target

    // One to many
    User.hasMany(Booking); // Source
    Booking.belongsTo(User); // Target

    Classroom.hasMany(Booking); // Source
    Booking.belongsTo(Classroom); // Target

    Building.hasMany(Classroom); // Source
    Classroom.belongsTo(Building); // Target

    // Many to many
    Equipment.belongsToMany(Classroom, { through: Classroom_Equipment });

    console.log('Relations added to all models')
  } catch (error) {
    throw error
  }
}

module.exports = addRelationsToModels
