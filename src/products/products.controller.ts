import { Body, Controller, Delete, Get, HttpStatus, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { ProductsService } from './products.service';
import { Express } from 'express'
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/helpers/image-storage';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Product } from './entities/product.entity';

@ApiTags("Products")
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService : ProductsService){}

    @Post()
    async create(@Body() createProdukDto : CreateProdukDto) {
        try{
            console.log(createProdukDto);
            
            return{
                data: await this.productsService.create(createProdukDto),
                statusCode: HttpStatus.CREATED,
                message: 'success',
            };
        } catch(e){
            console.log((e.code));
        }
    }

    @Get(':id')
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        return {
            data: await this.productsService.findOne(id),
            statusCode: HttpStatus.OK,
            message: 'success',
        };
    }

    @Get()
    async getAll(@Paginate() query: PaginateQuery): Promise<Paginated<Product>>{
        try{
            return await this.productsService.findAll(query)
        } catch(e){
            console.log(e);

        }

    }


    @Put(':id')
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateProdukDto: UpdateProdukDto,
    ) {
        return {
            data: await this.productsService.update(id, updateProdukDto),
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }

    @Delete(':id')
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.productsService.remove(id);

        return {
            statusCode: HttpStatus.OK,
            massage: 'success',
        };
    }



}
