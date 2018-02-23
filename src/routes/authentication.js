import express from 'express'
const Authentication = require('../controllers/authentication')

const router = express.Router()

router.get('/sign-up', (req, res) => {
  res.render('authentication/sign-up')
})

router.post('/sign-up', Authentication.signup)

router.get('/sign-in', (req, res) => {
  res.render('authentication/sign-in')
})

router.post('/sign-in', (req, res) => {
  // some stuff here
})

export default router
