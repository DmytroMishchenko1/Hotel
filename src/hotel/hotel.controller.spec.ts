import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { HotelDto } from './dto/hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { HotelController } from './hotel.controller';
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

describe('BookingController', () => {
  let controller: HotelController;
  const mockHotelService = {
    createHotel: jest.fn(dto => {
      return plainToClass(Hotel, {
        id: 1,
        ...dto
      });
    }),
    findAll: jest.fn().mockReturnValue(mockedData),
    findAllFromAPI: jest.fn().mockReturnValue([mockedData[0], mockedData[1]])
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HotelController],
      providers: [
        HotelService,
      ],
    }).overrideProvider(HotelService).useValue(mockHotelService).compile();

    controller = module.get<HotelController>(HotelController);
  });

  it('should check if controller create method works', async () => {
    const data = {
      title: 'Ave Plaza',
      distanceToCenter: 4000,
      distanceToCenterUnit: 'm',
      bookings: []
    }

    const dto = plainToClass(HotelDto, data);
    const result = await controller.createHotel(dto);
    expect(result).toBeInstanceOf(Hotel);
    expect(result).toEqual({id: 1, ...data});
  });

  it('should return list of Bookings from controller findAll method', async () => {
    
    const result = await controller.getAllHotels();
    expect(result).toBeDefined();
    expect(result).toEqual(mockedData);
  });

  it('should return data from mockedAPI', async () => {
    const resultFromApi = [mockedData[0], mockedData[1]];
    const coordinates = {xCordinate: 1, yCordinate: 2};
    const result = await controller.getAllHotelsFromAPI(coordinates);
    
    
    expect(result).toBeDefined();
    expect(result).toEqual(resultFromApi);
  });

});
