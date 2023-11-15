const Booking = require('../models/booking.model.js')
const Classroom = require('../models/classroom.model.js')
const { Op } = require("sequelize")

async function getAllBookings(req, res) {
	try {
		const bookings = await Booking.findAll({ paranoid: false })
		if (bookings) {
			return res.status(200).json(bookings)
		} else {
			return res.status(404).send('No booking found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneBooking(req, res) {
	try {
		const booking = await Booking.findByPk(req.params.id)
		if (booking) {
			return res.status(200).json(booking)
		} else {
			return res.status(404).send('Booking not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getMyBookings(req, res) {
	console.log(res.locals.user)
	try {
		const booking = await Booking.findAll({
			where: {
				userId: res.locals.user.id
			}
		})
		if (booking) {
			return res.status(200).json({ message: 'This/These is/are your booking/s', bookings: booking })
		} else {
			return res.status(404).send('Booking/s not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createBooking(req, res) {
	try {
		const date = req.body.bookingDate,
			dateFormatted = req.body.bookingDate.split("/").reverse().join("-"),
			time = req.body.bookingTime,
			idClassroom = req.body.classroomId,
			bookingExists = await Booking.findOne({
				where: {
					bookingDate: dateFormatted,
					bookingTime: time,
					classroomId: idClassroom
				}
			});
		// Checking whether another user has booked the classroom
		// at the same time and hour we want it to book it:
		if (bookingExists === null) {
			// Now, it is time to check if the id provided for 
			// the classroom belongs to an actual classroom in the
			// database:
			const classroomExists = await Classroom.findOne({
				where: {
					id: idClassroom
				}
			});

			if (!classroomExists) { res.status(404).send('Classroom not found.') }
			// In case the id exists, we check whether that classroom
			// is aimed at users with the role of the current logged in user.
			// Note that we use the «res.locals.user» variable, previously 
			// retrieved in the checkAuth() function:
			if (classroomExists.aimedAt === res.locals.user.role) {
				// If his/her role matches the classroom's, his/her «id» will be
				// stored in a new key (userId) in the body request, which we will
				// be passsing on to the Booking.create() function, as shown:
				req.body.userId = res.locals.user.id;
				// Important: We have to store the date in the correct format in the 
				// database (YYYY-MM-DD) so that, when the time comes to compare dates, 
				// it is done correctly.
				// To do so, the date format in the body request has to be converted to
				// the proper format:
				req.body.bookingDate = dateFormatted;
				const newBooking = await Booking.create(req.body)
				return res.status(200).json({ message: 'Booking successfully created!', booking: newBooking })
			} else {
				return res.status(400).send(`Booking cannot be created. 
				+Info: Your role is «${res.locals.user.role}» and this classroom 
				is only for «${classroomExists.aimedAt}s».`)
			}
		} else {
			return res.status(400).send(`Booking cannot be created. 
			+Info: There is already another booking with the same data 
			(Date: ${date} - Time: ${time} - IDClassroom: ${idClassroom}) 
			by another user.`)
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateBooking(req, res) {
	try {
		const [bookingExist, booking] = await Booking.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (bookingExist !== 0) {
			return res.status(200).json({ message: 'Booking updated', booking: booking })
		} else {
			return res.status(404).send('Booking not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function updateMyBooking(req, res) {
	try {
		const booking = await Booking.findByPk(req.params.id)
		if (booking) {
			// Checking whether the booking id the user has keyed in
			// belongs to that actual user or to another, in which case
			/// would not allow to make the update of the reservation:
			if (booking.userId === res.locals.user.id) {
				const classroomExists = await Classroom.findOne({
					where: {
						id: req.body.classroomId
					}
				});

				if (!classroomExists) { res.status(404).send('Classroom not found.') }

				if (classroomExists.aimedAt === res.locals.user.role) {

					const date = req.body.bookingDate,
						dateFormatted = req.body.bookingDate.split("/").reverse().join("-"),
						time = req.body.bookingTime,
						bookingExists = await Booking.findOne({
							where: {
								bookingDate: dateFormatted,
								bookingTime: time,
								classroomId: req.body.classroomId
							}
						});

					if (bookingExists === null) {
						req.body.bookingDate = dateFormatted;
						const [bookingUpdated] = await Booking.update(req.body, {
							where: {
								id: req.params.id,
							},
						})

						if (bookingUpdated !== 0) {
							return res.status(200).send('Your booking has been successfully updated!')
						} else {
							return res.status(400).json({ message: 'Your booking cannot be updated. +Info: There is nothing to update!', booking: booking })
						}
					} else {
						return res.status(400).send(`Booking cannot be updated. 
							+Info: There is already another booking with the same data 
							(Date: ${date} - Time: ${time} - IDClassroom: ${req.body.classroomId}) 
							by another user.`)
					}

				} else {
					return res.status(400).send(`Booking cannot be created. 
						+Info: Your role is «${res.locals.user.role}» and this classroom 
						is only for «${classroomExists.aimedAt}s».`)
				}
			} else {
				return res.status(400).send('Booking cannot be updated. +Info: The booking id you have provided does not belong to any of your reservations.')
			}
		} else {
			return res.status(404).send('Booking not found.')
		}

	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteBooking(req, res) {
	// Future implementation: Add if statements which check booking existence (id booking).
	// Look up updateMyBooking function above.
	try {
		const booking = await Booking.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (booking) {
			return res.status(200).json('Booking deleted')
		} else {
			return res.status(404).send('Booking not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteMyBooking(req, res) {
	// Future implementation: Add if statements which check booking existence (id booking) as well as if that booking belongs to the user requesting booking deletion.
	// Look up updateMyBooking function above.
	try {
		const booking = await Booking.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (booking) {
			return res.status(200).json('Booking deleted')
		} else {
			return res.status(404).send('Booking not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteBookings(req, res) {
	try {
		const startDate = req.query.startdate.split("/").reverse().join("-"),
			endDate = req.query.enddate.split("/").reverse().join("-");

		const booking = await Booking.destroy({
			where: {
				bookingDate: { [Op.between]: [startDate, endDate] },
			},
		})
		if (booking) {
			return res.status(200).json('Booking/s deleted')
		} else {
			return res.status(404).send('Booking/s not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllBookings,
	getOneBooking,
	getMyBookings,
	createBooking,
	updateBooking,
	updateMyBooking,
	deleteBooking,
	deleteMyBooking,
	deleteBookings
}