const User = require('../models/user.model.js'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { validatePassword } = require('../middleware/index.js');

async function login(req, res) {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) return res.status(404).send('Error: Email or Password incorrect') // Error in case we don't find the email
        const comparePass = bcrypt.compareSync(req.body.password, user.password)  // comparamos la contraseña enviada sin encriptar con la encriptada en la base de datos

        if (comparePass) {
            const payload = { email: user.email } // información que incluimos en el token
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })  // generamos el token
            return res.status(200).send({ token })
        } else {
            return res.status(404).json('Error: Email or Password incorrect')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }


}


async function signup(req, res) {
    try {
        if (!validatePassword(req.body.password)) {
            return res.status(400).send("Password not valid. +Info: It must contain at least one lowercase, one uppercase and one number.");
        } else {
            const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS))
            const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds)
            req.body.password = hashedPassword
    
            const user = await User.create(req.body)
            const payload = { email: user.email }
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
            return res.status(200).json({ message: 'User successfully created!', user: user, token: token })
        }       

    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { signup, login, validatePassword }