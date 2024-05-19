import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDto } from './invoice.dto';
import {
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsString,
  IsDate,
  IsArray,
  IsEnum,
} from 'class-validator';
import { UpdateProductDto } from './../../product/dto/updateproduct.dto';

enum InvoiceStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
}

export class UpdateInvoiceDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsArray()
  products?: UpdateProductDto[];

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsDate()
  dueDate?: Date;

  @IsOptional()
  @IsEnum(InvoiceStatus)
  status?: InvoiceStatus;
}
