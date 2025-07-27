const { addStaff, getAllStaffs } = require('../controllers/staff.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const staffRouter = require('express').Router()

staffRouter.post("/create", verifyJWT, authorize, addStaff)
staffRouter.get("/allStaffs", verifyJWT, getAllStaffs)

module.exports = staffRouter