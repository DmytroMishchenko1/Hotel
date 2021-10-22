import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Cordinates } from "src/entities/cordinates.entity";
import { HotelDto } from "./dto/hotel.dto";
import { Hotel } from "./entities/hotel.entity";
import { HotelService } from "./hotel.service";
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('hotel')
export class HotelController{
    constructor(private readonly hotelService: HotelService){}

    @Get()
    @ApiOkResponse({description: 'Returns all hotels from api for coordinates that user provides'})
    async getAllHotelsFromAPI(@Query() cordinates: Cordinates): Promise<HotelDto[]>{
        return await this.hotelService.findAllFromAPI(cordinates.xCordinate, cordinates.yCordinate);           
    }

    @Get('/all')
    @ApiOkResponse({description: 'Returns all hotels from database'})
    async getAllHotels(): Promise<Hotel[]>{
        return await this.hotelService.findAll();        
    }

    @Post('/')
    @ApiCreatedResponse({description: 'Hotel was added to database'})
    async createHotel(@Body() hotel: HotelDto): Promise<HotelDto>{
        const createdHotel = await this.hotelService.createHotel(hotel);
        return createdHotel;
    }

}