const { createService, deleteService, getAllService } = require('../controllers/service.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const serviceRouter = require('express').Router()

serviceRouter.post("/create",verifyJWT, authorize, createService)
serviceRouter.delete("/delete/:id",verifyJWT, authorize, deleteService)
serviceRouter.get("/getAllServices",verifyJWT, getAllService)

module.exports = serviceRouter