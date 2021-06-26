import sinon from 'sinon'

import { Mailer } from '../../../src/utils/Mailer'

const sandbox = sinon.createSandbox()

export function stubSendEmail(replace: boolean): void {
  sandbox.stub(Mailer.prototype, 'sendEmail').resolves(replace)
}

export function restoreMailer(): void {
  sandbox.restore()
}
