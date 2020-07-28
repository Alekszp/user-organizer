import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import { Login, Logout, Register, Authentication, UpdateUser, CreateUser } from "./controllers/userController";

mongoose.connect('mongodb://127.0.0.1:27017/usersorgs', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create express router
const router = express.Router()
const app = express()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// user controller
router.post('/register', async (req, res) => {
  await Register(req, res)
})
router.post('/authentication', async (req, res) => {
  await Authentication(req, res)
})
router.post('/updateUser', async (req, res) => {
  await UpdateUser(req, res)
})
router.post('/createUser', async (req, res) => {
  await CreateUser(req, res)
})
router.post('/login', async (req, res) => {
  await Login(req, res)
})
router.post('/logout', (req, res)=>{
  Logout(req, res)
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
