import { Controller, HttpStatus, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsDto } from './dto/bookings.dto';
import { HttpCode, Param, Get } from '@nestjs/common'; 
import {  Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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

}
