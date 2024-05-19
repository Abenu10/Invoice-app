import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsArray,
  IsEnum,
} from 'class-validator';
import { CreateProductDto } from './../../product/dto/product.dto';

export enum InvoiceStatus {
  PAID = 'PAID',
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
}

export class CreateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  number: number;

  @IsArray()
  products: CreateProductDto[];

  @IsNumber()
  total: number;

  @IsDate()
  dueDate: Date;

  @IsEnum(InvoiceStatus)
  status: InvoiceStatus;
}
