const { getAllUsers, getAnalytics } = require('../controllers/admin.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const adminRouter = require('express').Router()

adminRouter.get("/allUsers", verifyJWT, authorize, getAllUsers)
adminRouter.get("/getAnalytics", verifyJWT, authorize, getAnalytics)

module.exports = adminRouter