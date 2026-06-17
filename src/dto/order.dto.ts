import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ description: 'The ID of the user placing the order', example: 1 })
  userId: number;

  @ApiProperty({ description: 'The name of the product purchased', example: 'Super Widget v2' })
  productName: string;

  @ApiProperty({ description: 'The total amount of the order', example: 99.99 })
  amount: number;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({ description: 'The name of the product purchased', example: 'Super Widget v3' })
  productName?: string;

  @ApiPropertyOptional({ description: 'The total amount of the order', example: 109.99 })
  amount?: number;
}
