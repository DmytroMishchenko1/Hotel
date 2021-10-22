import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { HotelDto } from './dto/hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private hotelRepository: Repository<Hotel>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public async findAll(): Promise<Hotel[]> {
    return await this.hotelRepository.find();
  }

  
  public async createHotel(hotel: HotelDto): Promise<HotelDto> {
    const {title, distanceToCenter, distanceToCenterUnit, bookings} = hotel;
    const createdHotel = await this.hotelRepository.create({
      title, distanceToCenter, distanceToCenterUnit, bookings
    });
    const savedHotel = await this.hotelRepository.save(createdHotel);
    return createdHotel;
  }

  public async findAllFromAPI(xCordinate: number, yCordinate: number): Promise<HotelDto[]>{
    const API_KEY = this.configService.get('API_KEY');    
    const data = await firstValueFrom(this.httpService.get(`https://discover.search.hereapi.com/v1/discover?at=${xCordinate},${yCordinate}&q=hotel&apiKey=${API_KEY}`));
      data.data.items.map((entry) => {
      const hotel = new HotelDto();
      hotel.title = entry.title;
      hotel.distanceToCenter = entry.distance;
      hotel.distanceToCenterUnit = 'm';
      hotel.bookings = [];
      this.createHotel(hotel);
    });
  
    const currentHotelList: HotelDto[] = data.data.items.map((entry) => {
      return {
        title: entry.title, 
        distanceToCenter: entry.distance, 
        distanceToCenterUnit: 'm', 
        bookings: []
      }
    })
    return currentHotelList;
  }
}