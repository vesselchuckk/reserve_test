import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class BookingsDto {
	@IsInt()
	@Min(1, { message: 'event_id must be a positive integer' })
	@Expose({ name: 'event_id' })
	eventId: number;

	@IsString()
	@IsNotEmpty({ message: 'user_id must be a non-empty string' })
	@Expose({ name: 'user_id' })
	userId: string;
}