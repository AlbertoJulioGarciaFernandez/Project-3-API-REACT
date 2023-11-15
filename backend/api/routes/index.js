const router = require('express').Router();

router.use('/auth', require('./auth.router.js'))
router.use('/booking', require('./booking.router.js'));
router.use('/building', require('./building.router.js'));
router.use('/classroom', require('./classroom.router.js'));
router.use('/equipment', require('./equipment.router.js'));
router.use('/user', require('./user.router.js'));
router.use('/classroom_equipment', require('./classroom_equipment.router.js'))

module.exports = router;
