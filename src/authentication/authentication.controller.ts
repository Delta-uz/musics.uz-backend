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
import { LocalAuthenticationGuard } from './guards/localAuthentication.guard';
import JwtAuthenticationGuard from './guards/jwt-authentication.guard';
import { UsersService } from '../users/users.service';
import { EmailConfirmationService } from '../emailConfirmation/emailConfirmation.service';
import {
  ApiBadRequestResponse, ApiBody,
  ApiCookieAuth, ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('authentication')
@Controller('authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly usersService: UsersService,
    private readonly emailConfirmationService: EmailConfirmationService
  ) { }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Registration completed'
  })
  @ApiBadRequestResponse({
    description: 'Registration data does not match the requirements'
  })
  async register(@Body() registrationData: RegisterDto) {
    const user = await this.authenticationService.register(registrationData);
    if (user.email) {
      await this.emailConfirmationService.sendVerificationLink(user.email);
    }
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiOkResponse({
    description: 'Logged in'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that user'
  })
  @ApiBadRequestResponse({
    description: 'Wrong credentials provided'
  })
  @ApiBody({
    type: LoginDto
  })
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    request.res.setHeader('Set-Cookie', cookie);
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiOkResponse({
    description: 'Logged out'
  })
  @Post('logout')
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return request.res.sendStatus(HttpStatus.OK);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiCookieAuth()
  @ApiUnauthorizedResponse({
    description: 'User must be authenticated'
  })
  @ApiOkResponse({
    description: 'User is authenticated'
  })
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
