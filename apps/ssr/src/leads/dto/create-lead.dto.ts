import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  vehicleId!: string;

  @IsString()
  @IsNotEmpty()
  pickUpLocation!: string;

  @IsString()
  @IsNotEmpty()
  dropOffLocation!: string;

  @IsDateString()
  @IsNotEmpty()
  pickUpDate!: string;

  @IsDateString()
  @IsNotEmpty()
  dropOffDate!: string;
}
