import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The unique username of the user', example: 'john_doe' })
  username: string;

  @ApiProperty({ description: 'The email address of the user', example: 'john@example.com' })
  email: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'The unique username of the user', example: 'john_doe_updated' })
  username?: string;

  @ApiPropertyOptional({ description: 'The email address of the user', example: 'john_updated@example.com' })
  email?: string;
}
