import { Body, Controller, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';
import { CategoryService } from './category.service';


@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Post('create')
    async create(@Body() createCategoryDto: CreateCategoryDto) {
      return {
        data: await this.categoryService.create(createCategoryDto),
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    }

    @Get()
    async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Category>>{
      try{
        return await this.categoryService.findAll(query)
      } catch(e){
        console.log(e);
          
      }
    }

  @Get(':category')
    async findOne(@Param('category') category: string) {
      return {
        data: await this.categoryService.findOne(category),
        statusCode: HttpStatus.OK,
        message: 'success',
      };
    }


  @Put('edit/:id')
    async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return {
      data: await this.categoryService.update(id, updateCategoryDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
