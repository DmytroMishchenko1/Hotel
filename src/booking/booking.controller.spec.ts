import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
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

describe('BookingController', () => {
  let controller: BookingController;
  const mockUserService = {
    create: jest.fn(dto => {
      return plainToClass(Booking, {
        id: 1,
        ...dto
      });
    }),
    findAll: jest.fn().mockReturnValue(mockedData),
    findOne: jest.fn().mockReturnValue(mockedData[0]),
    update: jest.fn().mockReturnValue({...mockedData[0], isBooked: !mockedData[0].isBooked}),
    findAllForCurrentHotel: jest.fn().mockReturnValue([mockedData[0], mockedData[1]])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        BookingService,
      ],
    }).overrideProvider(BookingService).useValue(mockUserService).compile();

    controller = module.get<BookingController>(BookingController);
  });

  it('should check if controller create method works', async () => {
    const data = {
      roomNumber: 123,
      roomType: 'Lux',
      isBooked: true,
      hotel: []
    }

    const dto = plainToClass(CreateBookingDto, data);
    const result = await controller.create(dto);
    expect(result).toBeInstanceOf(Booking);
    expect(result).toEqual({id: 1, ...data});
  });

  it('should return list of Bookings from controller findAll method', async () => {
    const data = [
      {
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
      },
    ];

    const result = await controller.findAll();
    expect(result).toBeDefined();
    expect(result).toEqual(data);
  });

  it('should return one Booking from controller findOne method', async () => {
    const result = await controller.findOne(1);
    expect(mockUserService.findOne).toHaveBeenCalledWith(mockedData[0].id);
    expect(result).toBeDefined();
    expect(result).toEqual(mockedData[0]);
  });


  it('should update one Booking from controller', async () => {
    const updatedData = mockedData[0];
    updatedData.isBooked = !updatedData.isBooked;
    const result = await controller.update(1);
    
    expect(mockUserService.update).toHaveBeenCalledWith(mockedData[0].id);
    expect(result).toBeDefined();
    expect(mockUserService.update).toHaveBeenCalledTimes(1);
    expect(result).toEqual(updatedData);
  });

  it('should return all Bookings for hotel', async () => {
    const updatedData = [mockedData[0], mockedData[1]];
    const result = await controller.findAllBookingsForHotel(1);
    
    
    expect(result).toBeDefined();
    expect(result).toEqual(updatedData);
  });

});
