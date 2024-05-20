import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.UserService.findById(id);
  }
  @Get()
  async getAllUser() {
    return await this.UserService.findAll();
  }
}
