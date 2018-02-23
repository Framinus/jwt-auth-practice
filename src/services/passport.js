const passport = require('passport');
const config = require('../../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {findUserById, verifyUser} = require('../actions/signIn')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcrypt')

// create local strategy

const localOptions = {usernameField: 'email'}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  return verifyUser(email)
    .then((validUser) => {
      bcrypt.compare(password, validUser.password)
        .then((validPassword) => {
          if (validPassword) {
            return done(null, validUser)
          }
          return done(null, false)
        })
        .catch(err => done(err, false))
    })
})
// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret,
}

// create jwt Strategy

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  return findUserById(payload.sub)
    .then((foundUser) => {
      if (foundUser) {
        return done(null, foundUser)
      }
      return done(null, false)
    })
    .catch(err => done(err, false))
})

// tell passport to use this strategy.
passport.use(jwtLogin)
passport.use(localLogin)
