import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { DecreaseDto } from './dto/decrease.dto';
import { IncreaseDto } from './dto/increase.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ){}
  async create(createCartDto: CreateCartDto, id: string) {
    const product = await this.productRepository.findOne({
      where: {
        id: createCartDto.productId
      }
    })

    console.log(product);
    const checkProductExist = await this.cartRepository.findOne({
      where: [
        {
          product: {
            id: product.id
          },
          userId: id
        }
      ]
    })

    console.log("ini product exist: ");



    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          messages: 'Product not found',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (checkProductExist) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          messages: 'product is already in the cart'
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const cart = new Cart()
    cart.createdBy = await (await this.userRepository.findOne({ where: { id: id}})).email
    cart.userId = id
    cart.product = product
    cart.qty = createCartDto.qty
    cart.price = createCartDto.price

    const result = await this.cartRepository.insert(cart)

    return this.cartRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
      relations: ['product']
    });
  }

  async findAll (query: PaginateQuery): Promise<Paginated<Cart>>{
    return paginate(query, this.cartRepository, {
      sortableColumns: ['createdAt'],
      relations: ['product'],
      defaultSortBy: [['createdAt', 'ASC']],
      defaultLimit: 5,
    })
  }

  async findOne(id: string) {
    try {
      return await this.cartRepository.findOneOrFail({
        where: {
          id: id,
        },
        relations: ['product']
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
  async findOneByUser(id: string, userId: string) {
    try {
      return await this.cartRepository.findOneOrFail({
        where: [
          {
            product: {
              id: id
            },
            userId: userId
          }
        ],
        relations: ['product']
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

  async update(updateCartDto: UpdateCartDto, id: string) {
    try {
      await this.cartRepository.findOneOrFail({
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

    const cart = new Cart()
    cart.qty = updateCartDto.qty
    cart.price = updateCartDto.price

    await this.cartRepository.update(id, cart);

    return this.cartRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.cartRepository.findOneOrFail({
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

    await this.cartRepository.delete(id);
  }

  async increaseQty(increaseDto: IncreaseDto) {




    await this.cartRepository.createQueryBuilder()
    .update(Cart)
    .set({
      qty: ()=> `qty + ${increaseDto.qty}`
    })
    .where("id = :id", { id: increaseDto.id })
    .execute()
  }

  async decreaseQty(decreaseQty: DecreaseDto) {

    await this.cartRepository.createQueryBuilder()
    .update(Cart)
    .set({
      qty: ()=> `qty - ${decreaseQty.qty}`
    })
    .where("id = :id", { id: decreaseQty.id })
    .execute()
  }
}
