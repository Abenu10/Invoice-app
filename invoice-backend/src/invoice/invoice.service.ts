import {
  Body,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { UserService } from 'src/user/user.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';
@Injectable()
export class InvoiceService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      // const token = req.headers.authorization;
      return this.databaseService.invoice.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          products: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error fetching invoices ');
    }
  }
 async findAllByUser(userId: string) {
    try {
      return this.databaseService.invoice.findMany({
        where: { userId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          products: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching invoices ');
    }
  }


  async findOne(id: string) {
    try {
      return this.databaseService.invoice.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          products: {
            select: {
              id: true,
              name: true,
              price: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching invoices ');
    }
  }

  async create(createInvoiceDto: CreateInvoiceDto, userId: string) {
    const { products, dueDate, status } = createInvoiceDto;

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const total = products.reduce((acc, product) => acc + product.price, 0);

    const newInvoice = await this.databaseService.invoice.create({
      data: {
        user: { connect: { id: userId } },

        products: {
          create: products.map((product) => ({
            name: product.name,
            price: product.price,
          })),
        },
        total,
        dueDate: new Date().toISOString(),
        status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return newInvoice;
  }
  async update(id: string, updateInvoiceDto: UpdateInvoiceDto, userId: string) {
    const { products, dueDate, status } = updateInvoiceDto;

    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    const total = products.reduce((acc, product) => acc + product.price, 0);

    const existingProducts = products.filter((product) => product.id);
    const newProducts = products.filter((product) => !product.id);

    const updatedInvoice = await this.databaseService.invoice.update({
      where: { id },
      data: {
        ...(userId ? { user: { connect: { id: userId } } } : {}),
        products: {
          update: existingProducts.map((product) => ({
            where: { id: product.id },
            data: { name: product.name, price: product.price },
          })),
          create: newProducts.map((product) => ({
            name: product.name,
            price: product.price,
          })),
        },
        total,
        dueDate: new Date().toISOString(),
        status,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return updatedInvoice;
  }

  async delete(id: string) {
    // First, delete the related products
    await this.databaseService.product.deleteMany({
      where: { invoiceId: id },
    });

    // Then, delete the invoice
    const deletedInvoice = await this.databaseService.invoice.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });
    return deletedInvoice;
  }

  // ? i can use dto here
  async addProductToInvoice(createProductDto: CreateProductDto) {
    const { invoiceId, name, price } = createProductDto;
    const product = await this.databaseService.product.create({
      data: {
        invoice: { connect: { id: invoiceId } },
        name,
        price,
      },
    });

    // Update the total field in the Invoice entity
    const products = await this.databaseService.product.findMany({
      where: { invoiceId },
    });
    const total = products.reduce((acc, product) => acc + product.price, 0);
    await this.databaseService.invoice.update({
      where: { id: invoiceId },
      data: { total },
    });

    return product;
  }
  async updateProduct(
    @Param('id') invoiceId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const { id, name, price } = updateProductDto;
    const product = await this.databaseService.product.update({
      where: { id },
      data: {
        name,
        price,
        invoice: { connect: { id: invoiceId } },
      },
    });

    // Update the total field in the Invoice entity
    const products = await this.databaseService.product.findMany({
      where: { invoiceId },
    });
    const total = products.reduce((acc, product) => acc + product.price, 0);
    await this.databaseService.invoice.update({
      where: { id: invoiceId },
      data: { total },
    });

    return product;
  }
}
