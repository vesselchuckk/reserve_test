import { Injectable } from '@nestjs/common';
import { EventsDto } from './dto/events.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get all events w/ booking stats
   */
  async getAll(): Promise<EventsDto[]> {
    const events = await this.prisma.event.findMany({
      include: {
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    })

    return events.map((event) => ({
      id: event.id,
      name: event.name,
      total_seats: event.total_seats,
      created_at: event.created_at,
      booked_seats: event._count.bookings,
      available_seats: event.total_seats - event._count.bookings,
    }))
  }

  /**
   * Get a specific event by ID
   * @param id The ID of the event
   * @returns The event details or null if not found
   */
  async getById(id: number): Promise<EventsDto | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        _count: {
          select: { bookings: true },
        },
      },
    })

    if (!event) return null

    return event
  }
}
