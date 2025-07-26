const { createAppointment, getAllAppointments } = require('../controllers/appointment.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const appointmentRouter = require('express').Router()

appointmentRouter.post('/create', verifyJWT, createAppointment)
appointmentRouter.post('/getAllAppointments', verifyJWT , authorize, getAllAppointments)

module.exports = appointmentRouter