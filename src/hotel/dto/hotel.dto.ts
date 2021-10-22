import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entities/booking.entity";

export class HotelDto{
    @ApiProperty({type: String, description: 'title'})
    title: string;
    @ApiProperty({type: Number, description: 'distanceToCenter'})
    distanceToCenter: number;
    @ApiProperty({type: 'm', description: 'distanceToCenterUnit'})
    distanceToCenterUnit: 'm'|'km';
    @ApiProperty({type: Booking, description: 'bookings'})
    bookings: Array<Booking>
}