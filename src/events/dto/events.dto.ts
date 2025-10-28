import { IsDate, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class EventsDto {
	@IsInt()
	@Min(1, { message: 'id must be a positive integer' })
	id: number;

	@IsString()
	@IsNotEmpty({ message: 'name must be a non-empty string' })
	name: string;

	@IsInt()
	@Min(0, { message: 'total_seats must be a non-negative integer' })
	total_seats: number;

	@IsDate()
	created_at: Date;
}

