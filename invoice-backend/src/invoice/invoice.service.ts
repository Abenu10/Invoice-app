import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';
import { CreateInvoiceDto } from './dto/invoice.dto';
@Injectable()
export class InvoiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.invoice.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        products: true,
      },
    });
  }

  async findOne(id: string) {
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
        products: true,
      },
    });
  }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { userId, number, products, total, dueDate, status } =
      createInvoiceDto;
    return this.databaseService.invoice.create({
      data: {
        user: { connect: { id: userId } },
        number,
        products: {
          create: products.map((product) => ({
            name: product.name,
            price: product.price,
          })),
        },
        total,
        dueDate,
        status,
      },
    });
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const { userId, number, products, total, dueDate, status } =
      updateInvoiceDto;

    if (userId) {
      // Check if the userId exists
      const user = await this.databaseService.user.findFirst({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
    }

    return this.databaseService.invoice.update({
      where: { id },
      data: {
        ...(userId ? { user: { connect: { id: userId } } } : {}),
        number,
        products: {
          update: products.map((product) => ({
            where: { id: product.id },
            data: { name: product.name, price: product.price },
          })),
        },
        total,
        dueDate,
        status,
      },
    });
  }

  async delete(id: string) {
    return this.databaseService.invoice.delete({ where: { id } });
  }
}
