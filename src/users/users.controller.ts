import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthenticationGuard from '../authentication/guards/jwt-authentication.guard';
import { AdminGuard } from '../authentication/guards/admin.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {}

  @Put(':id/permit')
  @UseGuards(JwtAuthenticationGuard, AdminGuard)
  @ApiOkResponse({
    description: 'User has been successfully permitted as admin'
  })
  @ApiNotFoundResponse({
    description: 'Unable to find user with that id'
  })
  @ApiUnauthorizedResponse({
    description: 'You must authenticate first'
  })
  @ApiForbiddenResponse({
    description: 'You have no permission to access this source'
  })
  async makeAdmin(@Param('id') id: string) {
    console.log(id);
    return await this.usersService.makeAdmin(+id);
  }
}