import { Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsDto } from './dto/bookings.dto';
import { TopUserDto } from './dto/top-users.dto';
import { HttpCode, Param, Get } from '@nestjs/common'; 
import { Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('bookings')
@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}


  /**
   * POST /api/bookings/reserve
   */
  @Post('/reserve')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'book a seat' })
  @ApiResponse({ status: 201, description: 'booked successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async createBooking(@Body() bookingDto: BookingsDto){ 
    const booking = await this.bookingsService.createBooking(bookingDto)

    return {
      success: true,
      booking,
      message: 'Booking created successfully',
    }
  }

  /**
   * GET /api/bookings/user/:userId
   */
  @Get("user/:userId")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'get bookings by user ID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400, description: 'invalid user ID' })
  async getBookingsByUser(@Param("userId") userId: string) {
    const bookings = await this.bookingsService.getBookingsByUser(userId)
    return { bookings }
  }

  /**
   * GET /api/bookings/top-users
   */
  @Get('/top-users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "get top10 users by booking" })
  @ApiResponse({
    status: 200,
    description: 'list of best 10 users',
    type: [TopUserDto]
  })
  @ApiQuery({ 
    name: 'day', required: false, type: Number, description: 'date(DD)' 
  })
  @ApiQuery({ 
    name: 'month', required: false, type: Number, description: 'date(MM)' 
  })
  @ApiQuery({ 
    name: 'year', required: false, type: Number, description: 'date(YYYY)' 
  })
  async getTopUsers(
    @Query('day') day?: number,
    @Query('month') month?: number,
    @Query('year') year?: number,
  ): Promise<TopUserDto[]> {
    return this.bookingsService.getTop10({ day, month, year });
  }

}
