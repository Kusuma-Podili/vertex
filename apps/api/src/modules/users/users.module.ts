import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserAddressService } from './services/user-address.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserAddressService],
  exports: [UsersService, UserAddressService],
})
export class UsersModule {}
