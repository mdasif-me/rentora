import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Category } from '@rentora/types';
import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

@ApiTags('Categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all categories' })
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific category by ID' })
  async findOne(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category with optional image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'SUV' },
        description: { type: 'string', example: 'Spacious family vehicles' },
        isActive: { type: 'boolean', example: true },
        order: { type: 'number', example: 1 },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Category icon or image',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateCategoryDto,
    @UploadedFile() file?: any,
  ): Promise<Category> {
    return this.categoriesService.create(dto, file);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a category with optional image upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'SUV' },
        description: { type: 'string', example: 'Spacious family vehicles' },
        isActive: { type: 'boolean', example: true },
        order: { type: 'number', example: 1 },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
    @UploadedFile() file?: any,
  ): Promise<Category> {
    return this.categoriesService.update(id, dto, file);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a category by ID' })
  async delete(@Param('id') id: string): Promise<void> {
    return this.categoriesService.delete(id);
  }
}
