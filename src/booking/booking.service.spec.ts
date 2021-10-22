import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';


const mockedData = [{
  id: 1,  
  roomNumber: 123,
  roomType: 'Lux',
  isBooked: true,
  hotel: []
},
{
  id: 2,
  roomNumber: 124,
  roomType: 'Econom',
  isBooked: false,
  hotel: []
},
{
  id: 3,
  roomNumber: 125,
  roomType: 'Standart',
  isBooked: true,
  hotel: []
}];


describe('BookingService', () => {
  let service: BookingService;
  let repo: Repository<Booking>;

  const mockUserRepo = {
    create: jest.fn().mockImplementation(dto => dto),
    save: jest.fn().mockImplementation(booking => Promise.resolve({id: 1, ...booking})),
    find: jest.fn().mockImplementation(() => Promise.resolve(mockedData)),
    findOne: jest.fn().mockImplementation(() => Promise.resolve(mockedData[0])),
    update: jest.fn().mockImplementation(() => Promise.resolve({...mockedData[0], isBooked: !mockedData[0].isBooked})),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      
      providers: [BookingService,
      {
          provide: getRepositoryToken(Booking),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    repo = module.get<Repository<Booking>>(getRepositoryToken(Booking));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new booking record and return that', async () => {
    const savedBooking = await service.create({roomNumber: 222, roomType: 'Standart', isBooked: false, hotel: null}); 
    expect(savedBooking).toEqual({
      id: 1,
      roomNumber: 222, 
      roomType: 'Standart', 
      isBooked: false, 
      hotel: null
    });
  });

  it('should return list of bookings', async () => {
    const bookingsData = await service.findAll();
    expect(bookingsData).toEqual(mockedData);
  });

  it('should return one booking', async () => {
    const booking = await service.findOne(1); 
    expect(booking).toEqual(mockedData[0]);
  });

  it('should update one booking', async () => {
    const booking = await service.update(1); 
    expect(booking).toEqual(!mockedData[0].isBooked);
  });

});
