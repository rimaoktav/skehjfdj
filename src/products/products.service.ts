import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(Product)
        private produkRepository: Repository<Product>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
    ){}

    async create(createProdukDto: CreateProdukDto) {
        const produk = new Product()
        produk.name = createProdukDto.name
        produk.description = createProdukDto.description
        produk.price = createProdukDto.price
        produk.stok = createProdukDto.stok
        produk.user = await this.userRepository.findOne({where: {id: createProdukDto.userId}});
        produk.category = await this.categoryRepository.findOne({where: {id: createProdukDto.categoryId}});

        const result = await this.produkRepository.insert(produk)

        return this.produkRepository.findOneOrFail({
            where: {
                id: result.identifiers[0].id,
            },
        });
    }

    async findAll (query: PaginateQuery): Promise<Paginated<Product>>{
      return paginate(query, this.produkRepository, {
        sortableColumns: ['name'],
        defaultSortBy: [['name', 'ASC']],
        searchableColumns: ['name'],
        defaultLimit: 5,
        relations: ['category', 'user']
      })
    }


      async findOne(id: string) {
        try {
          return await this.produkRepository.findOneOrFail({
            where: {
              id,
            },
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }
      }

      async update(id: string, updateProdukDto: UpdateProdukDto) {
        try {
          await this.produkRepository.findOneOrFail({
            where: {
              id,
            },
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }

        const produk = new Product()
        produk.name = updateProdukDto.name
        produk.price = updateProdukDto.price
        produk.description = updateProdukDto.description
        produk.image = updateProdukDto.image
        produk.stok = updateProdukDto.stok
        produk.category = await this.categoryRepository.findOne({where: {id: updateProdukDto.categoryId}});

        await this.produkRepository.update(id, produk);
      }

      async remove(id: string) {
        try {
          await this.produkRepository.findOneOrFail({
            where: {
              id,
            },
          });
        } catch (e) {
          if (e instanceof EntityNotFoundError) {
            throw new HttpException(
              {
                statusCode: HttpStatus.NOT_FOUND,
                error: 'Data not found',
              },
              HttpStatus.NOT_FOUND,
            );
          } else {
            throw e;
          }
        }

        await this.produkRepository.delete(id);
      }

      async updateStock(id: string, stock: number) {
        stock
        await this.produkRepository.createQueryBuilder()
        .update(Product)
        .set({
          stok: ()=> `stok - ${stock}`
        })
        .where("id = :id", { id: id })
        .execute()
      }
}
