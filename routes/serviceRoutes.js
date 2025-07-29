const { createService, deleteService, getAllService, updateService } = require('../controllers/service.controller')
const { authorize } = require('../middlewares/authorization')
const { verifyJWT } = require('../middlewares/verifyJWT')

const serviceRouter = require('express').Router()

serviceRouter.post("/create",verifyJWT, authorize, createService)
serviceRouter.delete("/delete/:id",verifyJWT, authorize, deleteService)
serviceRouter.get("/getAllServices",verifyJWT, getAllService)
serviceRouter.put("/updateService",verifyJWT, updateService)

module.exports = serviceRouter