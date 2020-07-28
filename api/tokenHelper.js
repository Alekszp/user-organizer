import jwt from 'jsonwebtoken'
import * as config from './config'

function CreateToken(body) {
    return jwt.sign(body, config.jwt.secretOrKey, { expiresIn: config.expireIn })
}

export { CreateToken } 