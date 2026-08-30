import { IsNotEmpty, IsString } from 'class-validator';

export class RecommendVehiclesDto {
  @IsString()
  @IsNotEmpty()
  prompt!: string;
}
