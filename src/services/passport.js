const passport = require('passport');
const config = require('../../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {findUserById, verifyUser} = require('../actions/signIn')
const LocalStrategy = require('passport-local')

// create local strategy

const localOptions = {usernameField: 'email'}
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // verify this username and password.
  return verifyUser(email, password)
    .then((validUser) => {
      // some stuff. 
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
