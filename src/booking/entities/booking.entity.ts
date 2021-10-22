import { ApiProperty } from "@nestjs/swagger";
import { Hotel } from "src/hotel/entities/hotel.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ 
        unique: true,
        nullable: false,
      })
    @ApiProperty({type: Number, description: 'roomNumber'})
    roomNumber: number;
    
    @Column({
        length: 100,
        nullable: false
    })    
    @ApiProperty({type: String, description: 'roomType'})
    roomType: string;
    
    @Column({
        nullable: false,
        default: false
    })    
    @ApiProperty({type: Boolean, description: 'isBooked'})
    isBooked: boolean;

    @ManyToOne(() => Hotel, (hotel: Hotel) => hotel.bookings)
    @JoinColumn({ name: 'hotel_id' })
    @ApiProperty({type: Hotel, description: 'hotel'})
    hotel: Hotel;
  

}
