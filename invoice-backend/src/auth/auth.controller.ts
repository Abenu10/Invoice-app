import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }
}
