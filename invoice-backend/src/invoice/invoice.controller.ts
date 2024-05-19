import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.invoiceService.findOne(id);
  }

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.invoiceService.delete(id);
  }
}
