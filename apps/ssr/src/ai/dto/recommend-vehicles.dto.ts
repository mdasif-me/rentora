import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RecommendVehiclesDto {
  @ApiProperty({
    description: 'Natural language prompt asking for vehicle recommendations',
    example: 'I need a spacious SUV for a family of 5 going to the mountains',
  })
  @IsString()
  @IsNotEmpty()
  prompt!: string;
}
