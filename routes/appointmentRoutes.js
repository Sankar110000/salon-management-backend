const { createAppointment, getAllAppointments, getUserAppointments, cancelAppointment } = require('../controllers/appointment.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const appointmentRouter = require('express').Router()

appointmentRouter.post('/create', verifyJWT, createAppointment)
appointmentRouter.post('/getAllAppointments', verifyJWT , authorize, getAllAppointments)
appointmentRouter.get('/getUserAppointments', verifyJWT , getUserAppointments)
appointmentRouter.post("/cancelAppointment", cancelAppointment)

module.exports = appointmentRouter