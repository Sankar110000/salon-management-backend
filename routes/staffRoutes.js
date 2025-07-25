const { addStaff } = require('../controllers/staff.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const staffRouter = require('express').Router()

staffRouter.post("/create", verifyJWT, authorize, addStaff)

module.exports = staffRouter