import express from 'express'
import albums from './albums'
import authentication from './authentication'
const passport = require('passport')
const passportService = require('../services/passport')

const requireAuth = passport.authenticate('jwt', {session: false})

const routes = express.Router()

routes.get('/', requireAuth, (req, res) => res.redirect('/albums'))
routes.use('/albums', albums)
routes.use('/', authentication)

export default routes
