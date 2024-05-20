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
  Req,
  Res,
  UnauthorizedException,
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
  @Get('/user')
  async findAllByUser(@Req() req: Request) {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    const userId = user.id;
    return await this.invoiceService.findAllByUser(userId);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.invoiceService.findOne(id);
  }
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: Request,
    @Body() createInvoiceDto: CreateInvoiceDto,
  ) {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    const userId = user.id;
    return this.invoiceService.create(createInvoiceDto, userId);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException();
    }
    const userId = user.id;
    return this.invoiceService.update(id, updateInvoiceDto, userId);
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


}
