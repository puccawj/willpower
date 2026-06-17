import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { orders: true },
    });
  }

  async getById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { orders: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(username: string, email: string): Promise<User> {
    return this.prisma.user.create({
      data: { username, email },
    });
  }

  async update(id: number, username?: string, email?: string): Promise<User> {
    await this.getById(id);
    return this.prisma.user.update({
      where: { id },
      data: { username, email },
    });
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.getById(id);
    
    await this.prisma.order.deleteMany({
      where: { userId: id },
    });

    await this.prisma.user.delete({
      where: { id },
    });
    return { message: `User with ID ${id} and their orders have been successfully deleted` };
  }
}
