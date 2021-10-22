import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelController } from './hotel.controller';
import { Hotel} from './entities/hotel.entity';
import { HotelService } from './hotel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Hotel]), HttpModule],
  providers: [
    HotelService,
  ],
  controllers: [HotelController],
  exports: [TypeOrmModule]
})
export class HotelModule {}