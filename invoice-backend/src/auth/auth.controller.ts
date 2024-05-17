import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private userService:UserService) {}

    @Post('register')
    async register(@Body() dto: CreateUserDto){
        return await this.userService.create(dto)
    }
    @Post('login ')
    async login(@Body() dto: LoginDto){
        
    }
}
 