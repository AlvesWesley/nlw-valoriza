import nodemailer, { Transporter } from 'nodemailer'

export interface MailerConfig {
  host: string
  port: number
  user: string
  pass: string
}

export interface SendEmailOptions {
  from: string
  to: string
  subject: string
  content: string
}

export class Mailer {
  private readonly driver: Transporter

  constructor(config: MailerConfig) {
    const { host, port, user, pass } = config

    this.driver = nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
        user,
        pass
      }
    })
  }

  public async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { from, to, subject, content } = options

    const result = await this.driver.sendMail({
      from,
      to,
      subject,
      text: content
    })

    return !!result.messageId
  }
}
