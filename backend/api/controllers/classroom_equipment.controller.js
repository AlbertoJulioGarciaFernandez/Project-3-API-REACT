const Classroom_Equipment = require('../models/classroom_equipment.model.js')

async function getAllClassroom_Equipments(req, res) {
	try {
		const classroom_Equipment = await Classroom_Equipment.findAll({
			where: req.query,
			paranoid: false
		})
		if (classroom_Equipment) {
			return res.status(200).json(classroom_Equipment)
		} else {
			return res.status(404).send('No Classroom_Equipment found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneClassroom_Equipment(req, res) {
	try {
		const classroom_Equipment = await Classroom_Equipment.findByPk(req.params.id)
		if (classroom_Equipment) {
			return res.status(200).json(classroom_Equipment)
		} else {
			return res.status(404).send('Classroom_Equipment not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createClassroom_Equipment(req, res) {
	console.log(req.body);
	try {
		const classroom_Equipment = await Classroom_Equipment.create(
			req.body
		)
		return res.status(200).json({ message: 'Classroom_Equipment created', classroom_Equipment: classroom_Equipment })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateClassroom_Equipment(req, res) {
	try {
		const [classroom_EquipmentExist, classroom_Equipment] = await Classroom_Equipment.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (classroom_EquipmentExist !== 0) {
			return res.status(200).json({ message: 'Classroom_Equipment updated', classroom_Equipment: classroom_Equipment })
		} else {
			return res.status(404).send('Classroom_Equipment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteClassroom_Equipment(req, res) {
	try {
		const classroom_Equipment = await Classroom_Equipment.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (classroom_Equipment) {
			return res.status(200).json('Classroom_Equipment deleted')
		} else {
			return res.status(404).send('Classroom_Equipment not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllClassroom_Equipments,
	getOneClassroom_Equipment,
	createClassroom_Equipment,
	updateClassroom_Equipment,
	deleteClassroom_Equipment
}