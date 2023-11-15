const { checkAuth, checkAdmin } = require('../middleware/index.js');

const router = require('express').Router(),
    { getAllBuildings, getOneBuilding, createBuilding, updateBuilding, deleteBuilding } = require('../controllers/building.controller.js');

router.get('/', checkAuth, checkAdmin, getAllBuildings);
router.get('/:id', checkAuth, checkAdmin, getOneBuilding);
router.post('/', checkAuth, checkAdmin, createBuilding);
router.put('/:id', checkAuth, checkAdmin, updateBuilding);
router.delete('/:id', checkAuth, checkAdmin, deleteBuilding);

module.exports = router;
