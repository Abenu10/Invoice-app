import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  // constructor(private prisma: DatabaseService) {}
  // // async createUser(data: { email: string; name: string }) {
  // //     return this.prisma.user.create({ data });
  // // }
  // async create(dto:CreateUserDto){
  //     const user = await this.prisma.user.findUnique({
  //         where:{
  //             email:dto.email
  //         }
  //     })
  //     // if (user ) throw new ConflictException
  // }
}
