import { Controller, Get, Param, Query } from '@nestjs/common';
import type { Vehicle } from '@rentora/types';
import { VehiclesService } from './vehicles.service.js';

@Controller('api/vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
  ): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(category, search);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
}
