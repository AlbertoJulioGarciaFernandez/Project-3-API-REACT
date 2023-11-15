const Classroom = require('../models/classroom.model.js')


//User user
async function getAllClassrooms(req, res) {
	try {
		const classrooms = await Classroom.findAll({ paranoid: false })
		if (classrooms) {
			return res.status(200).json(classrooms)
		} else {
			return res.status(404).send('No classrooms found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneClassroom(req, res) {
	try {
		const classroom = await Classroom.findByPk(req.params.id)
		if (classroom) {
			return res.status(200).json(classroom)
		} else {
			return res.status(404).send('classroom not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function createClassroom(req, res) {
	console.log(req.body);
	try {
		const classroom = await Classroom.create(
			req.body
		)
		return res.status(200).json({ message: 'Classroom created', classroom: classroom })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateClassroom(req, res) {
	try {
		const [classroomExist, classroom] = await Classroom.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
		if (classroomExist !== 0) {
			return res.status(200).json({ message: 'Classroom updated', classroom: classroom })
		} else {
			return res.status(404).send('Classroom not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteClassroom(req, res) {
	try {
		const classroom = await Classroom.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (classroom) {
			return res.status(200).json('Classroom deleted')
		} else {
			return res.status(404).send('Classroom not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllClassrooms,
	getOneClassroom,
	createClassroom,
	updateClassroom,
	deleteClassroom
}
