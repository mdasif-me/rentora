import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import type { Vehicle } from '@rentora/types';
import { GetVehiclesQueryDto } from './dto/get-vehicles-query.dto.js';
import { VehiclesService } from './vehicles.service.js';

import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Vehicles')
@Controller({
  path: 'vehicles',
  version: '1',
})
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle with optional image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Toyota Camry' },
        category: { type: 'string', example: 'Sedan' },
        type: { type: 'string', example: 'Standard' },
        pricePerDay: { type: 'number', example: 50 },
        seats: { type: 'number', example: 5 },
        transmission: { type: 'string', example: 'Auto' },
        fuel: { type: 'string', example: 'Petrol' },
        location: { type: 'string', example: 'New York' },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Vehicle image file',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() data: Prisma.VehicleCreateInput,
    @UploadedFile() file?: any,
  ): Promise<Vehicle> {
    // Note: In a real app, you should use a proper DTO instead of Prisma.VehicleCreateInput
    // and parse numeric fields from form-data.
    const vehicleData = {
      ...data,
      pricePerDay: Number(data.pricePerDay),
      seats: Number(data.seats),
    };
    return this.vehiclesService.create(vehicleData as any, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles with optional filters' })
  async findAll(@Query() query: GetVehiclesQueryDto): Promise<Vehicle[]> {
    return this.vehiclesService.findAll(query.category, query.search);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific vehicle by ID' })
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehiclesService.findOne(id);
  }
}
