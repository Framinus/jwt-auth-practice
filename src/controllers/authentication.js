const jwt = require('jwt-simple')
const config = require('../../config')
const {createUser} = require('../actions/signUp')
const bcrypt = require('bcrypt')

const tokenForUser = (user) => {
  const timestamp = new Date().getTime()
  return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}

const signup = (req, res, next) => {

  const {name, email, password} = req.body
  const saltRounds = 5

  if (!email || !password) {
    res.status(422).send({error: 'You must provide an email and a password.'})
  }
  // see if a user with the given email exists.
  bcrypt.hash(password, saltRounds)
    .then((hash) => {
      return createUser(name, email, hash)
        .then((newUser) => {
          console.log(newUser)
          res.json({token: tokenForUser(newUser)})
        })
        .catch((err) => {
          console.error(err)
          res.json({error: 'Error saving user to database.'})
        })
    })
    .catch((err) => {
      return next(err)
    })
}

module.exports = {signup}
