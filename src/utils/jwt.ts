import jwt, { SignOptions } from 'jsonwebtoken'

export function sign(
  payload: Record<string, string>,
  secret: string,
  options?: SignOptions
): string {
  return jwt.sign(payload, secret, options)
}
