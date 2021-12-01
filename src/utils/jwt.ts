import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { Token } from '../types/Route'

export const verifyToken = (
  token: string,
  secret: jwt.Secret,
  options?: jwt.VerifyOptions
) =>
  promisify<string, jwt.Secret, jwt.VerifyOptions, Token>(jwt.verify)(
    token,
    secret,
    options
  )

export const signToken = (
  token: string | object | Buffer,
  secret: jwt.Secret,
  options?: jwt.SignOptions
) =>
  promisify<string | object | Buffer, jwt.Secret, jwt.SignOptions, string>(
    jwt.sign
  )(token, secret, options)
