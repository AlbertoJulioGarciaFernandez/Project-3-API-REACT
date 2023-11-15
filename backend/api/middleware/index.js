const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

function checkAuth(req, res, next) { // Authentication process: We check if the user has logged in
    // and been given the required «token».
    if (!req.headers.authorization) return res.status(401).send('Token not found')  // Checking if 
    // the «token» has been sent via the request header.

    jwt.verify(req.headers.authorization, process.env.SECRET, async (err, result) => {
        if (err) return res.status(401).send('Token not valid')

        const user = await User.findOne({ where: { email: result.email } })
        if (!user) return res.status(401).send('User not found')

        res.locals.user = user

        next()
    })
}

function checkAdmin(req, res, next) { // Checking if the user has access or not to the resource 
    // they are requesting (they will be given access depending on their role):
    if (res.locals.user.role !== 'admin') {
        return res.status(401).send('User not authorized')
    } else {
        next()
    }
}

function getTodaysDate() {
    // Getting the current date:
    const date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    return `${year}-${month}-${day}`;
}

function validatePassword(pass) {
    // Our API will be only allowing passwords which include upper and lower case letters from the
    // alphabet, numbers from zero to nine, and whose length equals eigth or more.
    const regex = new RegExp(/[a-zA-Z0-9]{8}/);
    
    if (regex.test(pass)) {
        return true;
    } else {
        return false;
    }
}


module.exports = { checkAuth, checkAdmin, getTodaysDate, validatePassword }
