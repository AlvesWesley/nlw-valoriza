import sinon from 'sinon'

import * as jwt from '../../../src/utils/jwt'

const sandbox = sinon.createSandbox()

export function stubJwtSign(replace: string): void {
  sandbox.stub(jwt, 'sign').returns(replace)
}

export function stubJwtVerify(replace: Record<string, string>): void {
  sandbox.stub(jwt, 'verify').returns(replace)
}

export function restoreJwt(): void {
  sandbox.restore()
}
