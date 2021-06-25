import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

export function sign(
  payload: Record<string, string>,
  secret: string,
  options?: SignOptions
): string {
  return jwt.sign(payload, secret, options)
}

export function verify(token: string, secret: string): string | JwtPayload {
  return jwt.verify(token, secret)
}
