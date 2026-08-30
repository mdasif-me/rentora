import { Controller, Get, Param, Query } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { GetVehiclesQueryDto } from './dto/get-vehicles-query.dto.js';
import { VehiclesService } from './vehicles.service.js';

@Controller('api/vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(@Query() query: GetVehiclesQueryDto): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(query.category, query.search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
}
