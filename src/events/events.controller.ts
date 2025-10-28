import { Controller, Get, Param, NotFoundException } from "@nestjs/common"
import { EventsService } from "./events.service"

@Controller("api/events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * GET /api/events
   */
  @Get()
  async getAllEvents() {
    const events = await this.eventsService.getAll()
    return { events }
  }

  @Get(":id")
  async getEventById(@Param("id") id: number) {
    const event = await this.eventsService.getById(id)
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`)
    }
    return { event }
  }

}