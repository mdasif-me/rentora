import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLeadDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ example: '+1234567890' })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({ example: 'uuid-of-vehicle' })
  @IsString()
  @IsNotEmpty()
  vehicleId!: string;

  @ApiProperty({ example: 'Airport Terminal 1' })
  @IsString()
  @IsNotEmpty()
  pickUpLocation!: string;

  @ApiProperty({ example: 'Downtown Hotel' })
  @IsString()
  @IsNotEmpty()
  dropOffLocation!: string;

  @ApiProperty({ example: '2026-09-01T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  pickUpDate!: string;

  @ApiProperty({ example: '2026-09-05T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  dropOffDate!: string;
}
