import { ApiProperty } from "@nestjs/swagger";
import { Hotel } from "src/hotel/entities/hotel.entity";

export class CreateBookingDto {
    @ApiProperty({type: Number, description: 'roomNumber'})
    roomNumber: number;
    @ApiProperty({type: String, description: 'roomType'})
    roomType: string;
    @ApiProperty({type: Boolean, description: 'isBooked'})
    isBooked: boolean;
    @ApiProperty({type: Hotel, description: 'hotel'})
    hotel: Hotel;
}
