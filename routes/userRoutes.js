const { registerUser, loginUser, getloggedInUser, logoutUser, getDetails } = require('../controllers/user.controller')
const { verifyJWT } = require('../middlewares/verifyJWT')

const userRouter = require('express').Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/getUser",verifyJWT, getloggedInUser)
userRouter.post("/logout", logoutUser)
userRouter.get("/getDetails", verifyJWT, getDetails)


module.exports = userRouter