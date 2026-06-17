import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return all orders.' })
  getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an order by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the order', type: Number })
  @ApiResponse({ status: 200, description: 'Return the order.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  createOrder(@Body() body: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(body.userId, body.productName, body.amount);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an order by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the order', type: Number })
  @ApiBody({ type: UpdateOrderDto })
  @ApiResponse({ status: 200, description: 'The order has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateOrderDto
  ): Promise<Order> {
    return this.ordersService.update(id, body.productName, body.amount);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an order by ID' })
  @ApiParam({ name: 'id', description: 'The unique identifier of the order to delete', type: Number })
  @ApiResponse({ status: 200, description: 'The order has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.ordersService.delete(id);
  }
}
