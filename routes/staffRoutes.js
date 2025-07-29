const { addStaff, getAllStaffs, deleteStaff } = require('../controllers/staff.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const staffRouter = require('express').Router()

staffRouter.post("/create", verifyJWT, authorize, addStaff)
staffRouter.get("/allStaffs", verifyJWT, getAllStaffs)
staffRouter.delete("/deleteStaff", verifyJWT, deleteStaff)

module.exports = staffRouter