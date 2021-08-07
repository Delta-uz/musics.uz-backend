import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, JwtModule, EmailModule, UsersModule],
  providers: [PasswordRecoveryService],
  controllers: [PasswordRecoveryController]
})
export class PasswordRecoveryModule {}
