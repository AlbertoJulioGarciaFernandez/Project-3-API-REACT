const router = require('express').Router()

const { getAllEquipments, getOneEquipment, createEquipment, updateEquipment, deleteEquipment } = require('../controllers/equipment.controller.js')
const { checkAuth, checkAdmin } = require('../middleware/index.js')

router.get('/', checkAuth, checkAdmin, getAllEquipments)
router.get('/:id', checkAuth, checkAdmin, getOneEquipment)
router.post('/', checkAuth, checkAdmin, createEquipment)
router.put('/:id', checkAuth, checkAdmin, updateEquipment)
router.delete('/:id', checkAuth, checkAdmin, deleteEquipment)

module.exports = router
