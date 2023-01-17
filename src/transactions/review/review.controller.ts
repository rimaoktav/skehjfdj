import { Body, ConflictException, Controller, DefaultValuePipe, Delete, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReviewDto } from '../dto/create-review.dto';
import { EditReviewDto } from '../dto/edit-review.dto';
import { Review } from '../entities/review.entity';
import { ReviewService } from './review.service';

@ApiTags("Review")
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() reviewDto: ReviewDto){
    try{
      return {
        data: await this.reviewService.create(reviewDto),
        statusCode: HttpStatus.CREATED,
        message: 'success',
      };
    } catch(e){
      if(e.code === '23505'){
        throw new ConflictException("You have reviewed this order")
      }

    }

  }

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
    ): Promise<Pagination<Review>> {
    limit = limit > 100 ? 100 : limit;

    return this.reviewService.findAll({
      page,
      limit,
      route: 'review',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() editReviewDto: EditReviewDto,
  ) {
    return {
      data: await this.reviewService.update(id, editReviewDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.reviewService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.reviewService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
