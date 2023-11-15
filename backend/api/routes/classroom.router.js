const router = require('express').Router()

const { getAllClassrooms, getOneClassroom, createClassroom, updateClassroom, deleteClassroom } = require('../controllers/classroom.controller.js')
const { checkAuth, checkAdmin } = require('../middleware/index.js')

router.get('/', checkAuth, checkAdmin, getAllClassrooms)
router.get('/:id', checkAuth, checkAdmin, getOneClassroom)
router.post('/', checkAuth, checkAdmin, createClassroom)
router.put('/:id', checkAuth, checkAdmin, updateClassroom)
router.delete('/:id', checkAuth, checkAdmin, deleteClassroom)

module.exports = router

