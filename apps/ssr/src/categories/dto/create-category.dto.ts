import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'SUV', description: 'Name of the category' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    example: 'Spacious vehicles for families',
    description: 'Description of the category',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Whether the category is active and visible',
  })
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    example: 1,
    description: 'Sort order (lower is first)',
  })
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  order?: number;
}
