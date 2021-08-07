import { BadRequestException, Injectable } from '@nestjs/common';
import EmailService from '../email/email.service';
import { UsersService } from '../users/users.service';
import VerificationTokenPayload from '../emailConfirmation/verificationTokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly emailService: EmailService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public sendRecoveryLink(email) {
    const payload: VerificationTokenPayload = { email };
    const token = this.jwtService.sign(payload);

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    const text = `Please click the link below to set a new password for your account: ${url}`;

    return this.emailService.sendMail({
      to: email,
      subject: 'Email Confirmation',
      text
    });
  }

  public async decodeRecoveryToken(token: string) {
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
        throw new BadRequestException('Password recovery token expired');
      }
      throw new BadRequestException('Unusable recovery token');
    }
  }

  public async recoverPassword(email: string, password: string) {
    await this.usersService.updatePassword(email, password);
  }
}
