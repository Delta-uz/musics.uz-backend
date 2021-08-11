import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import RecoveryEmailDto from './dto/recovery-email.dto';
import RecoveryTokenDto from './dto/recovery-token.dto';
import RecoveryPasswordDto from './dto/recover-password.dto';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';

@ApiTags('password-recovery')
@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService
  ) {}

  @Post('forgot')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Recovery link has been sent successfully'
  })
  @ApiBadRequestResponse({
    description: 'Can not send link to the email'
  })
  async forgotPassword(@Body() recoveryData: RecoveryEmailDto) {
    await this.passwordRecoveryService.sendRecoveryLink(recoveryData.email);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Token has been confirmed'
  })
  @ApiBadRequestResponse({
    description: 'Unusable token'
  })
  async confirm(@Body() recoveryData: RecoveryTokenDto) {
    return await this.passwordRecoveryService.decodeRecoveryToken(recoveryData.token);
  }

  @Post('recover')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Password has been recovered'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find that user'
  })
  @ApiBadRequestResponse({
    description: 'Data does not match the schema'
  })
  async recoverPassword(@Body() recoveryData: RecoveryPasswordDto) {
    return await this.passwordRecoveryService.recoverPassword(recoveryData.email, recoveryData.password)
  }
}
