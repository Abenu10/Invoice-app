import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { DatabaseService } from 'src/database/database.service';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [InvoiceService, DatabaseService, UserService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
