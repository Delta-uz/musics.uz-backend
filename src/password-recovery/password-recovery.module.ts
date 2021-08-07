import { Module } from '@nestjs/common';
import { PasswordRecoveryService } from './password-recovery.service';
import { PasswordRecoveryController } from './password-recovery.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_RECOVERY_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_RECOVERY_EXPIRATION_TIME')}s`
        }
      })
    }),
    EmailModule,
    UsersModule
  ],
  providers: [PasswordRecoveryService],
  controllers: [PasswordRecoveryController]
})
export class PasswordRecoveryModule {}
