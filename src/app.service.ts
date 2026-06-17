import { Injectable, NotFoundException } from '@nestjs/common';

export interface Item {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
}

@Injectable()
export class AppService {
  private items: Item[] = [
    { id: 1, name: 'Item One', description: 'This is item number one.', createdAt: new Date() },
    { id: 2, name: 'Item Two', description: 'This is item number two.', createdAt: new Date() },
  ];
  private nextId = 3;

  getAll(): Item[] {
    return this.items;
  }

  getById(id: number): Item {
    const item = this.items.find(i => i.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  create(name: string, description?: string): Item {
    const newItem: Item = {
      id: this.nextId++,
      name,
      description,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: number, name?: string, description?: string): Item {
    const item = this.getById(id);
    if (name !== undefined) {
      item.name = name;
    }
    if (description !== undefined) {
      item.description = description;
    }
    return item;
  }

  delete(id: number): { message: string } {
    const index = this.items.findIndex(i => i.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(index, 1);
    return { message: `Item with ID ${id} has been deleted successfully` };
  }
}
