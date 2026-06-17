import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Item } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@ApiTags('items')
@Controller('items')
export class AppController {
  constructor(private readonly appService: AppService) { }

  // 1. GET ALL
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Return all items.' })
  getAllItems(): Promise<Item[]> {
    return this.appService.getAll();
  }

  // 2. GET BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get an item by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the item', type: Number })
  @ApiResponse({ status: 200, description: 'Return the item.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item> {
    return this.appService.getById(id);
  }

  // 3. POST (Create)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.' })
  createItem(@Body() body: CreateItemDto): Promise<Item> {
    return this.appService.create(body.name, body.description);
  }

  // 4. PUT (Update)
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing item by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the item', type: Number })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateItemDto
  ): Promise<Item> {
    return this.appService.update(id, body.name, body.description);
  }

  // 5. DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the item to delete', type: Number })
  @ApiResponse({ status: 200, description: 'The item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  deleteItem(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.appService.delete(id);
  }
}
