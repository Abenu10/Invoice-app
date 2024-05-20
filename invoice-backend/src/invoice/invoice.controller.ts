import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';
import { JwtGuard } from 'src/auth/guards/jwt.gurard';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findAll() {
    return await this.invoiceService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.invoiceService.findOne(id);
  }
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.invoiceService.delete(id);
  }
  // add product to invoice
  @UseGuards(JwtGuard)
  @Put(':id/add-product')
  async addProductToInvoice(@Body() createProductDto: CreateProductDto) {
    return await this.invoiceService.addProductToInvoice(createProductDto);
  }
  // update product of invoice
  @UseGuards(JwtGuard)
  @Put(':invoiceId/update-product')
  async updateProduct(
    @Param('invoiceId') invoiceId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.invoiceService.updateProduct(invoiceId, updateProductDto);
  }

  //   // remove product from invoice
  //   @UseGuards(JwtGuard)
  //   @Put(':id/remove-product')
  //   async remove(@Body() body: any) {
  //     return await this.invoiceService.remove(body);
  //   }
  //   // get invoice products
  //   @UseGuards(JwtGuard)
  //   @Get(':id/products')
  //   async getInvoiceProducts(@Param('id') id: string) {
  //     return await this.invoiceService.getInvoiceProducts(id);
  //   }
  //   // get invoice total
  //   @UseGuards(JwtGuard)
  //   @Get(':id/total')
  //   async getTotal(@Param('id') id: string) {
  //     return await this.invoiceService.getTotal(id);
  // }
}
