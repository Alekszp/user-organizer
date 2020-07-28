import {isEmpty} from "lodash";
import Model from '../models/UserModel'
import bcrypt from 'bcryptjs'
import jwtDecode from 'jwt-decode'
import {CreateToken} from "../tokenHelper.js";
import Cookie from 'js-cookie'

const Login = async function (req, res) {
  try {
    let user = await Model.findOne({email: req.body.email}).lean().exec()
    if (!isEmpty(user) && bcrypt.compare(req.body.password, user.password)) {
      const token = CreateToken({
        id: user._id,
        username: user.username
      })
      let users = await Model.find({})
      res.cookie('token', token, { httpOnly: true })
      res.header('Authentication', token)
      res.status(200).send(users)

    } else {
      res.status(401).send('User not exist or password not a correct')
    }
  } catch {
    res.status(401).send('User broken')
  }
}
const Logout = function (req, res) {
  res.clearCookie('token')
  res.status(200).send('logout')
}
const Register = async function (req, res) {
  try {
    let user = await Model.findOne({
      username: req.body.username
    }).lean().exec()

    if (user != void(0)) {
      return res.status(500).send({
        message: 'User already exist'
      })
    }
    user = await Model.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
    const token = CreateToken({
      id: user._id,
      username: user.username
    })
    let users = await Model.find({})
    res.cookie('token', token, {
      httpOnly: true
    })
    res.header('Authentication', token)
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
  }

}
const CreateUser = async function (req, res) {
  try {
    let cookieToken = req.headers.cookie
    let token = cookieToken.split("=")[1]
    let tokenUser = jwtDecode(token)

    if (token === void(0)) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    let loggedUser = await Model.findOne({
      _id: tokenUser.id
    }).lean().exec()

    if (loggedUser === void(0)) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    let user = await Model.findOne({
      username: req.body.username
    }).lean().exec()

    if (user != void(0)) {
      return res.status(500).send({
        message: 'User already exist'
      })
    }

    user = await Model.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      position: req.body.position,
      salary: req.body.salary
    })
    
    let users = await Model.find({})
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
  }

}
const UpdateUser = async function (req, res) {
  try {
    let cookieToken = req.headers.cookie
    let token = cookieToken.split("=")[1]
    let tokenUser = jwtDecode(token)

    if (token === void(0)) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    let user = await Model.findOne({
      _id: tokenUser.id
    }).lean().exec()

    if (user === void(0)) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    await Model.updateOne({
      _id: req.body.id
    }, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob,
        position: req.body.position,
        salary: req.body.salary
      }
    })
    let users = await Model.find({})
    res.status(200).send(users)
  } catch (error) {
    console.log(error)
  }

}
const Authentication = async function (req, res) {
  try {
    let cookieToken = req.headers.cookie
    if (cookieToken === void(0)) {
        return res.status(401).send({message: 'Unauthorized'})
    }
    let token = cookieToken.split("=")[1]
    let tokenUser = jwtDecode(token)

    if (token === void(0)) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    let user = await Model.findOne({
      _id: tokenUser.id
    }).lean().exec()

    if (user === void(0)) {
      return res.status(401).send({
        message: 'Unauthorized'
      })
    }
    let users = await Model.find({})

    res.status(200).send({
      currentUser: user,
      users: users
    })
  } catch (error) {
    console.log('error', error)
  }

}

export {
  Login,
  Logout,
  Register,
  Authentication,
  UpdateUser,
  CreateUser
}
