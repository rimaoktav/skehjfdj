import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Request, UseGuards, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { DecreaseDto } from './dto/decrease.dto';
import { IncreaseDto } from './dto/increase.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Request() req, @Body() createCartDto: CreateCartDto) {
    return{
      data: await this.cartService.create(createCartDto,req.user.id),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Cart>>{
    try{
      return await this.cartService.findAll(query)
    } catch(e){
      console.log(e);

    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.cartService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return {
      data: await this.cartService.update(updateCartDto, id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete('remove/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.cartService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('increase')
  async increaseQty(@Body() increaseDto: IncreaseDto) {
    return{
      data: await this.cartService.increaseQty(increaseDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Post('decrease')
  async decreaseQty(@Body() decreaseQty: DecreaseDto) {
    return{
      data: await this.cartService.decreaseQty(decreaseQty),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
