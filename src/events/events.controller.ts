import { Controller, Get, Param, NotFoundException } from "@nestjs/common"
import { EventsService } from "./events.service"
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from "@nestjs/swagger"
import { EventsDto } from "./dto/events.dto"

@ApiTags("events")
@Controller("api/events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'get all events' })
  @ApiResponse({
    status: 200,
    description: 'events list',
    type: [EventsDto],
  })
  async getAllEvents() {
    const events = await this.eventsService.getAll()
    return { events }
  }

  @Get(":id")
  @ApiOperation({ summary: 'Получить событие по ID' })
  @ApiParam({ name: 'id', type: Number, example: 1, description: 'ID события' })
  @ApiResponse({
    status: 200,
    description: 'Событие найдено',
    type: EventsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Событие не найдено',
  })
  async getEventById(@Param("id") id: number) {
    const event = await this.eventsService.getById(id)
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`)
    }
    return { event }
  }

}