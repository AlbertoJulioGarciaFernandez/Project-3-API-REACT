const User = require('../models/user.model.js'),
	jwt = require('jsonwebtoken'),
	bcrypt = require('bcrypt'),
	{ validatePassword } = require('../controllers/auth.controller.js');

async function getAllUsers(req, res) {
	try {
		const users = await User.findAll({
			// Filtering with the «where» clause in case query 
			// params are passed as arguments.
			where: req.query,
			paranoid: false
		})
		if (users) {
			return res.status(200).json({ users: users })
		} else {
			return res.status(404).send('No users found.')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getOneUser(req, res) {
	try {
		const user = await User.findByPk(req.params.id)
		if (user) {
			return res.status(200).json({ user: user })
		} else {
			return res.status(404).send('User not found.')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function getProfile(req, res) {
	try {
		const user = await User.findByPk(res.locals.user.id)
		if (!user) { res.status(500).send("User not found") }
		res.status(200).json(user)
	} catch (error) {
		res.status(402).send(error.message)
	}
}

async function createUser(req, res) {
	try {
		const user = await User.create(
			req.body
		)
		return res.status(200).json({ message: 'User successfully created!', user: user })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

async function updateUser(req, res) {
	try {
		// Before trying to update the user, we have to
		// check in the database if he/she exists:
		const user = await User.findByPk(req.params.id)
		if (user) {
			const [userUpdated] = await User.update(req.body, {
				where: {
					id: req.params.id,
				},
			})

			if (userUpdated !== 0) {
				// If we tried to use the variable «user.dataValues» here, 
				// we would not get the updated values for the user being processed
				// but their former data:
				return res.status(200).send('User successfully updated!')
			} else {
				// Here, however, we can use the variable as their data has not changed:
				return res.status(400).json({ message: 'User cannot be updated. +Info: He/She already has those values!', user: user })
			}
		} else {
			return res.status(404).send('User not found.')
		}


	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function updateProfile(req, res) {
	try {
		// Before trying to update the user, we have to
		// check in the database if he/she exists:
		const user = await User.findByPk(res.locals.user.id)
		if (user) {
			if (req.body.role !== undefined) {
				return res.status(400).send('You cannot modify your role. +Info: Contact an admin.')
			} else {
				const [userUpdated] = await User.update(req.body, {
					where: {
						id: res.locals.user.id
					},
				})
				if (userUpdated !== 0) {
					// If we tried to use the variable «user.dataValues» here, 
					// we would not get the updated values for the user being processed
					// but their former data:
					return res.status(200).send('User successfully updated!')
				} else {
					// Here, however, we can use the variable as their data has not changed:
					return res.status(400).json({ message: 'User cannot be updated. +Info: You already have that/those value/s!', user: user })
				}
			}
		} else {
			return res.status(404).send('User not found.')
		}


	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function updatePassword(req, res) {
	try {
		const user = await User.findByPk(res.locals.user.id)
		if (user) {
			// First of all, password validation:
			if (validatePassword(req.body.password)) {
				// compareSync function will be checking if the password the user passes 
				// in the body request (decrypted) equals the password the user has stored
				// in the database (encrypted):  
				if (bcrypt.compareSync(req.body.password, user.password)) {
					// After the process, if they are equal, the following message will be displayed:
					return res.status(400).json({ message: 'Password cannot be updated. +Info: You already have that password!', user: user })
				} else {
					// However, if they are different, the decrypted password will be encrypted and 
					// then stored in the corresponding password key of the body section:
					const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS)),
						hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
					req.body.password = hashedPassword;
					const payload = { email: res.locals.user.email },
						token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }),
						[passwordUpdated] = await User.update(req.body, {
							where: {
								id: res.locals.user.id
							},
						})

					if (passwordUpdated !== 0) {
						return res.status(200).json({ message: 'Your password has been successfully updated!', token: token })
					} else {
						return res.status(400).json({ message: 'Password cannot be updated. +Info: You already have that password!', user: user })
					}
				}
			} else {
				return res.status(400).send("Password not valid. +Info: It must contain at least one lowercase, one uppercase and one number.");
			}

		} else {
			return res.status(404).send('User not found.')
		}


	} catch (error) {
		return res.status(500).send(error.message)
	}
}

async function deleteUser(req, res) {
	try {
		const user = await User.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (user) {
			return res.status(200).json({ message: 'User successfully deleted!', user: user })
		} else {
			return res.status(404).send('User not found.')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

module.exports = {
	getAllUsers,
	getOneUser,
	getProfile,
	createUser,
	updateUser,
	updateProfile,
	updatePassword,
	deleteUser
}
