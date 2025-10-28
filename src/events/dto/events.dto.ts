import { IsDate, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EventsDto {
	@ApiProperty({
	example: 1,
	description: 'id of the event',
	})
	@IsInt()
	@Min(1, { message: 'id must be a positive integer' })
	id: number;

	@ApiProperty({
	example: 'Event Name',
	description: 'name of the event',
	})
	@IsString()
	@IsNotEmpty({ message: 'name must be a non-empty string' })
	name: string;

	@ApiProperty({
	example: 100,
	description: 'total seats available for the event',
	})
	@IsInt()
	@Min(0, { message: 'total_seats must be a non-negative integer' })
	total_seats: number;

	@IsDate()
	created_at: Date;
}

