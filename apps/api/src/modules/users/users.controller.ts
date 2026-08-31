import { Controller, Get, Put, Body, UseGuards, Req, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserAddressService } from './services/user-address.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserProfileDto } from '@enterprise/types';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly addressService: UserAddressService,
  ) {}

  @Get('profile')
  async getProfile(@Req() req: any) {
    return this.usersService.findById(req.user.userId);
  }

  @Put('profile')
  async updateProfile(@Req() req: any, @Body() dto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(req.user.userId, dto);
  }

  @Get('addresses')
  async getAddresses(@Req() req: any) {
    return this.addressService.getUserAddresses(req.user.userId);
  }
}
