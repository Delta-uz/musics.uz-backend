import { Module } from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule, EmailModule, JwtModule],
  providers: [EmailConfirmationService],
  exports: [EmailConfirmationService]
})
export class EmailConfirmationModule {}