const router = require('express').Router(),
    { getAllUsers, getOneUser, getProfile, createUser, updateUser, deleteUser, updateProfile, updatePassword } = require('../controllers/user.controller.js'),
    { checkAuth, checkAdmin } = require('../middleware');

router.get('/', checkAuth, checkAdmin, getAllUsers)
router.get('/getProfile', checkAuth, getProfile)
router.get('/:id', checkAuth, checkAdmin, getOneUser)
router.post('/', checkAuth, checkAdmin, createUser)
router.put('/updateProfile', checkAuth, updateProfile)
router.put('/updatePassword', checkAuth, updatePassword)
router.put('/:id', checkAuth, checkAdmin, updateUser)
router.delete('/:id', checkAuth, checkAdmin, deleteUser)

module.exports = router
