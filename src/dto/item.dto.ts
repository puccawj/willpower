import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'The name of the item', example: 'Widget' })
  name: string;

  @ApiPropertyOptional({ description: 'A brief description of the item', example: 'A high quality widget' })
  description?: string;
}

export class UpdateItemDto {
  @ApiPropertyOptional({ description: 'The name of the item', example: 'Super Widget' })
  name?: string;

  @ApiPropertyOptional({ description: 'A brief description of the item', example: 'An upgraded high quality widget' })
  description?: string;
}
