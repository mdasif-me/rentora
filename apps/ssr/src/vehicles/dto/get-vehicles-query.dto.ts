import { IsOptional, IsString } from 'class-validator';

export class GetVehiclesQueryDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
