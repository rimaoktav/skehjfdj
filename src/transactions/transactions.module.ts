import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartModule } from 'src/cart/cart.module';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { User } from 'src/users/entities/user.entity';
import { Transactions } from './entities/transactions.entity';
import { ReviewModule } from './review/review.module';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transactions, User, Product]), CartModule, ProductsModule, ReviewModule],
  controllers: [TransactionsController],
  providers: [TransactionsService]
})
export class TransactionsModule {}
