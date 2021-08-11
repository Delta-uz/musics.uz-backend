import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
  constructor(private readonly configService: ConfigService) {
    this.nodemailerTransport = createTransport({
      service: configService.get('EMAIL_SERVICE'),
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD')
      },
      name: 'delta.uz'
    });
  }

  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail({
      ...options,
      from: `"Musics.uz" <${this.configService.get('EMAIL_USER')}>`
    });
  }
}