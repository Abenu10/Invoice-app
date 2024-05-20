import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.gurard';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.UserService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Get()
  async getAllUser() {
    return await this.UserService.findAll();
  }
  
  // @UseGuards(JwtGuard)
  // @Get()
  // async getUserByToken()

}
      
