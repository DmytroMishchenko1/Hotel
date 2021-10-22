import { Booking } from 'src/booking/entities/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Hotel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ 
    length: 100,
    nullable: false,
  })
  @ApiProperty({type: String, description: 'title'})
  title: string;

  @Column({
    nullable: false
  })
  @ApiProperty({type: Number, description: 'distanceToCenter'})
  distanceToCenter: number;


  @Column({
    nullable: false
  })
  @ApiProperty({type: 'm', description: 'distanceToCenterUnit'})
  distanceToCenterUnit: 'm'|'km';


  @OneToMany(() => Booking, (booking: Booking) => booking.hotel, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @ApiProperty({type: Booking, description: 'bookings'})
  bookings: Array<Booking>


}