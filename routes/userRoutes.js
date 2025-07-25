const { registerUser, loginUser, getloggedInUser, logoutUser } = require('../controllers/user.controller')
const { verifyJWT } = require('../middlewares/verifyJWT')

const userRouter = require('express').Router()

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.get("/getUser",verifyJWT, getloggedInUser)
userRouter.post("/logout", logoutUser)


module.exports = userRouter