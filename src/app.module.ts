import { Module } from '@nestjs/common';
import { HotelModule } from './hotel/hotel.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: 'bin/.env',}),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: `${process.env.HOST}`,
      port: parseInt(process.env.PORT),
      username: `${process.env.ROOTUSER}`,
      password: `${process.env.PASSWORD}`,
      database: `${process.env.DATABASE}`,
      autoLoadEntities: true,
      synchronize: true,
    }),
    HotelModule,
    HttpModule,
    BookingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
