import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':account')
  index(@Param() params) {
    const { account } = params;
    return this.userService.getUserByAccount(account);
  }
}
