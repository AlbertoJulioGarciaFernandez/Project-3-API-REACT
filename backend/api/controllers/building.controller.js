const Building = require('../models/building.model.js'),
	User = require('../models/user.model.js');

async function getAllBuildings(req, res) {
	try {
		const buildings = await Building.findAll({ paranoid: false })
		if (buildings) {
			return res.status(200).json({ buildings: buildings })
		} else {
			return res.status(404).send('No buildings found.')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneBuilding(req, res) {
	try {
		const building = await Building.findByPk(req.params.id)
		if (building) {
			return res.status(200).json({ building: building })
		} else {
			return res.status(404).send('Building not found.')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createBuilding(req, res) {
	try {

		// Checking if a «userId» was provided in the body
		// of the POST request:
		if (req.body.userId !== undefined) {

			const user = await User.findByPk(req.body.userId)

			// Checking if any user with the given id has been
			// retrieved from the database:
			if (user) {

				// If he/she exists, we control whether they are a building administrator:
				if (user.dataValues.role !== 'buildingAdmin') {
					res.status(400).json({ text: 'This user is not a building administrator.', user: user });
				} else {
					const building = await Building.create(
						req.body
					)
					res.status(200).json({ message: 'Building successfully created!', building: building })
				}
			} else {
				res.status(404).json({ text: "The user with the provided id does not exist.", userId: req.body.userId });

			}

		} else {
			const building = await Building.create(
				req.body
			)
			res.status(200).json({ message: 'Building successfully created!', building: building })
		}
	} catch (error) {

		res.status(500).send(error.message)
	}
}

async function updateBuilding(req, res) {
	try {

		// Before trying to update the building, we have to
		// check in the database if it exists:
		const building = await Building.findByPk(req.params.id)
		if (building) {

			// Checking if a «userId» was provided in the body
			// of the POST request:
			if (req.body.userId !== undefined) {

				const user = await User.findByPk(req.body.userId)

				// Checking if any user with the given id has been
				// retrieved from the database:
				if (user) {
					// If he/she exists, we control whether they are a building administrator:
					if (user.dataValues.role !== 'buildingAdmin') {
						res.status(400).json({ text: 'This user is not a building administrator.', user: user });
					} else {
						const [buildingUpdated] = await Building.update(req.body, {
							where: {
								id: req.params.id,
							},
						})

						if (buildingUpdated !== 0) {
							return res.status(200).send('Building successfully updated!')
						} else {
							return res.status(400).json({ message: 'Building cannot be updated. +Info: It already has those values!', building: building })
						}
					}
				} else {
					res.status(404).json({ text: "The user with the provided id does not exist.", userId: req.body.userId });
				}
			} else {
				const [buildingUpdated] = await Building.update(req.body, {
					where: {
						id: req.params.id,
					},
				})

				if (buildingUpdated !== 0) {
					return res.status(200).send('Buiflding successfully updated!')
				} else {
					return res.status(400).json({ message: 'Building cannot be updated. +Info: It already has those values!', building: building })
				}
			}
		} else {
			return res.status(404).send('Building not found.')
		}


	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteBuilding(req, res) {
	try {
		const building = await Building.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (building) {
			res.status(200).json({ message: 'Building successfuly deleted!', building: building })
		} else {
			return res.status(404).send('Building not found.')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllBuildings,
	getOneBuilding,
	createBuilding,
	updateBuilding,
	deleteBuilding
}
