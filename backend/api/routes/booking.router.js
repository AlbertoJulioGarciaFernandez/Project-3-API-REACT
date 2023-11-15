const router = require('express').Router()

const { getOneBooking, getAllBookings, createBooking, updateBooking, deleteBooking, getMyBookings, updateMyBooking, deleteBookings, deleteMyBooking } = require('../controllers/booking.controller')
const { checkAuth, checkAdmin } = require('../middleware')

router.get('/', checkAuth, checkAdmin, getAllBookings)
router.get('/getMyBookings', checkAuth, getMyBookings)
router.get('/:id', checkAuth, checkAdmin, getOneBooking)
router.post('/', checkAuth, createBooking)
router.post('/:id', checkAuth, checkAdmin, createBooking)
router.put('/updateMyBooking/:id', checkAuth, updateMyBooking)
router.put('/:id', checkAuth, checkAdmin, updateBooking)
router.delete('/deleteBookings', checkAuth, checkAdmin, deleteBookings)
router.delete('/deleteMyBooking/:id', checkAuth, deleteMyBooking)
router.delete('/:id', checkAuth, checkAdmin, deleteBooking)

module.exports = router