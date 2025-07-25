const { createAppointment } = require('../controllers/appointment.controller')
const { verifyJWT } = require('../middlewares/verifyJWT')

const appointmentRouter = require('express').Router()

appointmentRouter.post('/create', verifyJWT, createAppointment)

module.exports = appointmentRouter