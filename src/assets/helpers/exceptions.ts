import { HttpException, HttpStatus } from "@nestjs/common";

export class BookingError extends HttpException {
	constructor(message: string, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {
		super(message, statusCode);
	}
}

export class EventNotFoundError extends HttpException {
	constructor(eventId: number, statusCode: HttpStatus = HttpStatus.NOT_FOUND) {
		super(`Event with ID ${eventId} not found`, statusCode);
	}
}

export class NoSeatsAvailableException extends BookingError {
  constructor() {
    super("No available seats for this event", HttpStatus.CONFLICT)
  }
}

export class DuplicateBookingException extends BookingError{
  constructor(userId: string, eventId: number) {
    super(`User ${userId} already has a booking for event ${eventId}`, HttpStatus.CONFLICT)
  }
}


