import { Booking } from './../assets/interface/api.interfaces';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BookingsDto } from './dto/bookings.dto';
import { DuplicateBookingException, EventNotFoundError } from 'src/assets/helpers/exceptions';
import { NoSeatsAvailableException } from 'src/assets/helpers/exceptions';
import { throwError } from 'rxjs';

@Injectable()
export class BookingsService {
	constructor(private readonly prisma: PrismaService) {}

	async createBooking(bookingDto: BookingsDto): Promise<Booking> {
		const { event_id, user_id } = bookingDto;

		const event = await this.prisma.event.findUnique({
			where: { id: event_id },
			include: {
				_count: {
					select: { bookings: true },
				},
			},
		})

		if (!event) throw new EventNotFoundError(event_id)

		const availableSeats = event.total_seats - event._count.bookings
		if (availableSeats <= 0) throw new NoSeatsAvailableException()

		try {
			const booking = await this.prisma.booking.create({
				data: {
					eventId: event_id,
					userID: user_id,
				},
			})

			return {
				id: booking.id,
				event_id: booking.eventId,
				user_id: booking.userID,
				created_at: booking.createdAt,
			}
		} catch (error) {
			if (error.code === 'P2002') {
				throw new DuplicateBookingException(user_id, event_id)
			}
			throw error
		}
	}

	async getBookingsByUser(userId: string): Promise<Booking[]> {
    const bookings = await this.prisma.booking.findMany({
      where: { userID: userId },
      include: {
        event: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return bookings.map((booking) => ({
      id: booking.id,
      event_id: booking.eventId,
      user_id: booking.userID,
      created_at: booking.createdAt,
      event_name: booking.event.name,
      event_total_seats: booking.event.total_seats,
    }))
  }

	async getBookingsByEvent(eventId: number): Promise<Booking[]> {
		const bookings = await this.prisma.booking.findMany({
			where: { eventId },
			include: {
				event: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		})

		return bookings.map((booking) => ({
			id: booking.id,
			event_id: booking.eventId,
			user_id: booking.userID,
			created_at: booking.createdAt,
		}))
	}
}
