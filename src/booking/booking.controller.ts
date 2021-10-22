import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @ApiCreatedResponse({description: 'Created posible booking'})
  @ApiBody({type: CreateBookingDto})
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @Get()
  @ApiOkResponse({description: 'Returns list of possible bookings'})
  async findAll(): Promise<Booking[]> {
    return await this.bookingService.findAll();
  }

  @Get('/hotel/:id')
  @ApiOkResponse({description: 'Returns list of possible bookings for specific hotel'})
  @ApiBody({type: Number})
  findAllBookingsForHotel(@Param('id') id: number) {
    return this.bookingService.findAllForCurrentHotel(id);
  }

  @Get(':id')
  @ApiOkResponse({description: 'Returns one booking'})
  @ApiBody({type: Number})
  findOne(@Param('id') id: number) {
    return this.bookingService.findOne(id);
  }

  @Put(':id')
  @ApiCreatedResponse({description: 'Updated isBooked field'})
  update(@Param('id') id: number) {
    return this.bookingService.update(id);
  }

}
