import { ApiProperty } from '@nestjs/swagger';

export class TopUserDto {
  @ApiProperty({
    description: 'user ID',
    example: 'user123',
  })
  user: string;

  @ApiProperty({
    description: 'place in top (1-10)',
    example: 1,
  })
  place: number;

  @ApiProperty({
    description: 'number of bookings',
    example: 3,
  })
  bookings_count: number;
}