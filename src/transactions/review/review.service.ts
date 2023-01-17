import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ReviewDto } from '../dto/create-review.dto';
import { EditReviewDto } from '../dto/edit-review.dto';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewService {
    constructor(@InjectRepository(Review) private reviewRepo: Repository<Review>){}

    async create(reviewDto: ReviewDto){
      const transaction: any = reviewDto.transaction_id
      const review = new Review()
      review.transaction = transaction;
      review.message = reviewDto.message
      review.rate = reviewDto.rating

      const result = await this.reviewRepo.insert(review)
      return this.reviewRepo.findOneOrFail({
        where: {
          id: result.identifiers[0].id,
        },
        }
      )
    }

    async update(id: string, editReviewDto: EditReviewDto) {
      try {
        await this.reviewRepo.findOneOrFail({
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
      const transaction: any = editReviewDto.transaction_id
      const review = new Review()
      review.transaction = transaction;
      review.message = editReviewDto.message
      review.rate = editReviewDto.rating

      const result = await this.reviewRepo.update(id, review)
    }

    async remove(id: string) {
      try {
        await this.reviewRepo.findOneOrFail({
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

      await this.reviewRepo.delete(id);
    }

    async findAll (options: IPaginationOptions): Promise<Pagination<Review>>{
      const queryBuilder = this.reviewRepo.createQueryBuilder('review_user')
      .innerJoinAndSelect('review_user.transaction', 'transaction')
      .innerJoinAndSelect('transaction.user', 'user')
      .orderBy('review_user.rate', 'DESC')

      return paginate<Review>(queryBuilder, options);
    }

    async findOne(id: string) {
      try {
        return await this.reviewRepo.findOneOrFail({
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
}
