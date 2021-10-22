import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { HotelService } from './hotel.service';
import { from } from 'rxjs'
import { plainToClass } from 'class-transformer';
import { Booking } from 'src/booking/entities/booking.entity';

const mockedData: Hotel[] = [{
  id: 1,  
  title: 'Palace',
  distanceToCenter: 2000,
  distanceToCenterUnit: 'm',
  bookings: []
},
{
  id: 2,  
  title: 'New York',
  distanceToCenter: 3000,
  distanceToCenterUnit: 'm',
  bookings: []
},
{
  id: 3,  
  title: 'Ave Plaza',
  distanceToCenter: 4000,
  distanceToCenterUnit: 'm',
  bookings: []
}];



describe('HotelService', () => {
  let service: HotelService;
  let httpService: HttpService;
  // const axios = require('axios');
  // jest.mock('axios');

  const mockUserRepo = {
    create: jest.fn().mockImplementation(dto => plainToClass(Booking, {id: 1, ...dto})),
    save: jest.fn().mockImplementation(booking => Promise.resolve({id: 1, ...booking})),
    find: jest.fn().mockImplementation(() => Promise.resolve(mockedData)),
  };

  // jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [
        HotelService,
        HttpService,
        ConfigService,
        {
          provide: getRepositoryToken(Hotel),
          useValue: mockUserRepo,
        },
      ],
    }).overrideProvider(HttpService).useValue({
      get: jest.fn().mockReturnValue(from([{data: {items: [{title: 'Test hotel', id: 'abcdef', distance: 50}]}}]))
    }).overrideProvider(ConfigService).useValue({
      get: (key) => key
    }).compile();

    service = module.get<HotelService>(HotelService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('returns the title of the first album', async () => {
    const mockedResponse = {
      items: {
        title: 'New York',
        distanceToCenter: 3000,
        distanceToCenterUnit: 'm',
        bookings: []        
      }
    }
    // axios.get.mockResolvedValue(mockedResponse);
    // const hotelService = require('./hotel.service');
    const result = await service.findAllFromAPI(42, 42);
    expect(httpService.get).toHaveBeenCalledWith('https://discover.search.hereapi.com/v1/discover?at=42,42&q=hotel&apiKey=API_KEY');
    expect(result).toEqual([{
      bookings: [],
      distanceToCenter: 50,
      distanceToCenterUnit: "m",
      title: 'Test hotel'
    }]);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new hotel record and return that', async () => {
    const savedHotel = await service.createHotel({title: 'Palace', distanceToCenter: 2000, distanceToCenterUnit: 'm',bookings: []}); 
    expect(savedHotel).toEqual({
      id: 1,
      title: 'Palace',
      distanceToCenter: 2000,
      distanceToCenterUnit: 'm',
      bookings: []
    });
  });

  // it('should return list of bookings', async () => {
  //   const bookingsData = await service.findAll();
  //   expect(bookingsData).toEqual(mockedData);
  // });

  // it('should return one booking', async () => {
  //   const booking = await service.findOne(1); 
  //   expect(booking).toEqual(mockedData[0]);
  // });

  // it('should update one booking', async () => {
  //   const booking = await service.update(1); 
  //   expect(booking).toEqual(!mockedData[0].isBooked);
  // });

});
