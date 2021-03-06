import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import EmailService from '../email/email.service';
import VerificationTokenPayload from './verificationTokenPayload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private readonly usersService: UsersService
  ) {}

  public sendVerificationLink(email: string) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload);

    const url = `${this.configService.get("EMAIL_CONFIRMATION_URL")}?token=${token}`;

    const text = `Welcome to Delta Music! To confirm your email address, click here: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      text
    });
  }

  public async confirmEmail(email: string) {
    const user = await this.usersService.getByEmailOrPhone(email);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email is already confirmed');
    }
    return await this.usersService.markEmailAsConfirmed(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET')
      });

      if(typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if(error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Unusable confirmation token');
    }
  }

  public async resendConfirmationLink(userId: number) {
    const user = await this.usersService.getById(userId);
    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email is already confirmed')
    }
    await this.sendVerificationLink(user.email);
  }
}