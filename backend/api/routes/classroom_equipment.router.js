const router = require('express').Router()

const { getAllClassroom_Equipments, getOneClassroom_Equipment, createClassroom_Equipment, updateClassroom_Equipment, deleteClassroom_Equipment } = require('../controllers/classroom_equipment.controller')
const { checkAuth, checkAdmin } = require('../middleware')

router.get('/', checkAuth, checkAdmin, getAllClassroom_Equipments)
router.get('/:id', checkAuth, checkAdmin, getOneClassroom_Equipment)
router.post('/', checkAuth, checkAdmin, createClassroom_Equipment)
router.put('/:id', checkAuth, checkAdmin, updateClassroom_Equipment)
router.delete('/:id', checkAuth, checkAdmin, deleteClassroom_Equipment)

module.exports = router
