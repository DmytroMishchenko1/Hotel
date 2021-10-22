import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './entities/hotel.entity';
import { HotelService } from './hotel.service';

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
  const axios = require('axios');
  jest.mock('axios');

  const mockUserRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(booking => Promise.resolve({id: 1, ...booking})),
    find: jest.fn().mockImplementation(() => Promise.resolve(mockedData)),
  };

  // jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [HotelService,
      {
          provide: getRepositoryToken(Hotel),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
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
    axios.get.mockResolvedValue(mockedResponse);
    const hotelService = require('./hotel.service');
    hotelService.findAllFromAPI();
    expect(axios.get).toHaveBeenCalled()
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
