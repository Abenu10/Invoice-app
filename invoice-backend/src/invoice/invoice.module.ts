import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [InvoiceService, DatabaseService, UserService, JwtService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}