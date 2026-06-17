import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Item } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Item[]> {
    return this.prisma.item.findMany();
  }

  async getById(id: number): Promise<Item> {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async create(name: string, description?: string): Promise<Item> {
    return this.prisma.item.create({
      data: {
        name,
        description,
      },
    });
  }

  async update(id: number, name?: string, description?: string): Promise<Item> {
    // Check if item exists first to throw NotFoundException
    await this.getById(id);
    return this.prisma.item.update({
      where: { id },
      data: {
        name,
        description,
      },
    });
  }

  async delete(id: number): Promise<{ message: string }> {
    // Check if item exists first to throw NotFoundException
    await this.getById(id);
    await this.prisma.item.delete({
      where: { id },
    });
    return { message: `Item with ID ${id} has been deleted successfully` };
  }
}
