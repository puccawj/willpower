import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Order[]> {
    return this.prisma.order.findMany({
      include: { user: true },
    });
  }

  async getById(id: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async create(userId: number, productName: string, amount: number): Promise<Order> {
    const userExists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${userId} not found. Cannot create order.`);
    }

    return this.prisma.order.create({
      data: {
        userId,
        productName,
        amount,
      },
    });
  }

  async update(id: number, productName?: string, amount?: number): Promise<Order> {
    await this.getById(id);
    return this.prisma.order.update({
      where: { id },
      data: {
        productName,
        amount,
      },
    });
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.getById(id);
    await this.prisma.order.delete({
      where: { id },
    });
    return { message: `Order with ID ${id} has been successfully deleted` };
  }
}
