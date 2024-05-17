import { IsEmail, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
  
  @IsString()
  password: string;

  // @IsEnum(['CLIENT', 'ADMIN'], {
  //   message: 'valid role required',
  // })
  // role: 'CLIENT' | 'ADMIN';
}
