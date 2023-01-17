import { forwardRef, Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../entities/review.entity';
import { Transactions } from '../entities/transactions.entity';
import { TransactionsModule } from '../transactions.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Transactions]), forwardRef(()=> TransactionsModule)],
  controllers: [ReviewController],
  providers: [ReviewService]
})
export class ReviewModule {}
