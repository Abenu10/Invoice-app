import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { UserService } from 'src/user/user.service';
@Injectable()
export class InvoiceService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
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

  async create(createInvoiceDto: CreateInvoiceDto) {
    const { userId, products, total, dueDate, status } = createInvoiceDto;

    // Check if the user exists
    const user = await this.userService.getUserById(userId);
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

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
  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const { userId, products, total, dueDate, status } = updateInvoiceDto;

    if (userId) {
      // Check if the userId exists
      const user = await this.databaseService.user.findFirst({
        where: { id: userId },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
    }

    const updatedInvoice = await this.databaseService.invoice.update({
      where: { id },
      data: {
        ...(userId ? { user: { connect: { id: userId } } } : {}),

        products: {
          update: products?.map((product) => ({
            where: { id: product.id },
            data: { name: product.name, price: product.price },
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
}
