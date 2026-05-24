import jwt, { SignOptions } from 'jsonwebtoken'

export function signAccessToken(payload: object): string {
  const secret = process.env.JWT_SECRET!
  const options: SignOptions = { expiresIn: (process.env.JWT_EXPIRES_IN || '15m') as SignOptions['expiresIn'] }
  return jwt.sign(payload, secret, options)
}

export function signRefreshToken(payload: object): string {
  const secret = process.env.JWT_REFRESH_SECRET!
  const options: SignOptions = { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'] }
  return jwt.sign(payload, secret, options)
}
