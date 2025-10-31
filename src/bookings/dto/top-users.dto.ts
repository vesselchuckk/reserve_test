import { ApiProperty } from '@nestjs/swagger';

export class TopUserDto {
  @ApiProperty({
    description: 'User ID',
    example: 'user123',
  })
  user: string;

  @ApiProperty({
    description: 'Place in top (1-10)',
    example: 1,
  })
  place: number;

  @ApiProperty({
    description: 'Number of bookings',
    example: 3,
  })
  bookings_count: number;
}