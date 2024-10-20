import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      throw new InternalServerErrorException(
        'Faltam as variáveis de ambiente GMAIL_USER e GMAIL_APP_PASSWORD.',
      );
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email enviado: ${info.response}`);
    } catch (error) {
      console.error(`Erro ao enviar email: ${error.message}`);
      throw new InternalServerErrorException(
        'Não foi possível enviar o email. Tente novamente mais tarde.',
      );
    }
  }
}
