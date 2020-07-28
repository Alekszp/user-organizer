import express from 'express'
import * as userController from "../controllers/userController";
const userRouter = express.Router()

userRouter.use('/register', userController.Register)

export {userRouter}