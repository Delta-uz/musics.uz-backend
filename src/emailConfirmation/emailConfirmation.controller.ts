import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, HttpCode, HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmailConfirmationService } from './emailConfirmation.service';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import RequestWithUser from '../authentication/requestWithUser.interface';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('email-confirmation')
@Controller('email-confirmation')
@UseInterceptors(ClassSerializerInterceptor)
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService
  ) {}

  @Post('resend-confirmation-link')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({
    description: 'Confirmation link successfully sent'
  })
  @ApiBadRequestResponse({
    description: 'Email is already confirmed'
  })
  async resendConfirmationLink(@Req() request: RequestWithUser) {
    await this.emailConfirmationService.resendConfirmationLink(request.user.id);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Email has been successfully confirmed'
  })
  @ApiBadRequestResponse({
    description: 'Unusable token or email is already confirmed'
  })
  async confirm(@Body() confirmationData: ConfirmEmailDto) {
    const email = await this.emailConfirmationService.decodeConfirmationToken(confirmationData.token);
    return await this.emailConfirmationService.confirmEmail(email);
  }
}