import bcryptjs from 'bcryptjs'

export async function hash(text: string): Promise<string> {
  const salt = await bcryptjs.genSalt()
  return bcryptjs.hash(text, salt)
}

export async function compare(text: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(text, hash)
}
