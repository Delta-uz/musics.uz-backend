import { Body, Controller, Post } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import RecoveryEmailDto from './dto/recovery-email.dto';
import RecoveryTokenDto from './dto/recovery-token.dto';
import RecoveryPasswordDto from './dto/recover-password.dto';

@Controller('password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService
  ) {}

  @Post('forgot')
  forgotPassword(@Body() recoveryData: RecoveryEmailDto) {
    return this.passwordRecoveryService.sendRecoveryLink(recoveryData.email);
  }

  @Post('confirm')
  async confirm(@Body() recoveryData: RecoveryTokenDto) {
    return await this.passwordRecoveryService.decodeRecoveryToken(recoveryData.token);
  }

  @Post('recover')
  async recoverPassword(@Body() recoveryData: RecoveryPasswordDto) {
    return await this.passwordRecoveryService.recoverPassword(recoveryData.email, recoveryData.password)
  }
}
