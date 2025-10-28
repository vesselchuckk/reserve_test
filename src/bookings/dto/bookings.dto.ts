import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class BookingsDto {
	@ApiProperty({ example: 1, description: 'ID of the event' })
	@IsInt()
	@Min(1, { message: 'event_id must be a positive integer' })
	@Expose({ name: 'event_id' })
	event_id: number;

	@ApiProperty({ example: 'user123', description: 'ID of the user' })
	@IsString()
	@IsNotEmpty({ message: 'user_id must be a non-empty string' })
	@Expose({ name: 'user_id' })
	user_id: string;
}