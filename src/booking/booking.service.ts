import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor( @InjectRepository(Booking)
  private hotelRepository: Repository<Booking>,){}

  public async create(createBookingDto: CreateBookingDto): Promise<Booking> {
      const {roomNumber, roomType, isBooked, hotel} = createBookingDto;
      const createdBooking = await this.hotelRepository.create({
        roomNumber, roomType, isBooked, hotel
      });
      return this.hotelRepository.save(createdBooking);  
  }

  public findAll(): Promise<Booking[]> {
    return this.hotelRepository.find();
  }

  public findOne(id: number):Promise<Booking>{
    return this.hotelRepository.findOne(id);
  }

  public findAllForCurrentHotel(id: number):Promise<Booking[]>{
    return this.hotelRepository.find({where: {hotel: id}});
  }

  public async update(id: number): Promise<boolean> {
    const foundBooking = await this.findOne(id);
    if(!foundBooking){
      throw new HttpException('Don\'t have such id',HttpStatus.NOT_FOUND);
    }
    const {isBooked} = foundBooking;
    const newStatusOfBooking = !isBooked;
    const updatedBooking = await this.hotelRepository.update(id,{
       isBooked: newStatusOfBooking
    });
    return updatedBooking?.affected > 0;
  }

}
