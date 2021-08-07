import {
  Controller,
  Post,
  Body,
  Req,
  HttpCode,
  UseGuards,
  Get,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import { UsersService } from '../users/users.service';
import { EmailConfirmationService } from '../email/emailConfirmation.service';

@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor )
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const user = this.authenticationService.register(registrationData);
    await this.emailConfirmationService.sendVerificationLink(registrationData.email);
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return request.res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
