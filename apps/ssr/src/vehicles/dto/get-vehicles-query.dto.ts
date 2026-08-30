import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetVehiclesQueryDto {
  @ApiPropertyOptional({
    description: 'Filter by vehicle category',
    example: 'SUV',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    description: 'Search term for name or type',
    example: 'Toyota',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    description: 'Filter by vehicle location',
    example: 'New York',
  })
  @IsOptional()
  @IsString()
  location?: string;
}
