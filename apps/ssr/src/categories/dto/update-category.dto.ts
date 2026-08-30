import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'SUV' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Spacious vehicles for families' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: true })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 1 })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  order?: number;
}
