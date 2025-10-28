import { Controller, HttpStatus, Post } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsDto } from './dto/bookings.dto';
import { HttpCode, Param, Get } from '@nestjs/common'; 
import {  Body } from '@nestjs/common';

@Controller('api/bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}


  /**
   * POST /api/bookings/reserve
   */
  @Post('/reserve')
  @HttpCode(HttpStatus.CREATED)
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
  async getBookingsByUser(@Param("userId") userId: string) {
    const bookings = await this.bookingsService.getBookingsByUser(userId)
    return { bookings }
  }

}
