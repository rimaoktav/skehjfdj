import { Product } from "src/products/entities/product.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    createdBy: string;

    @Column()
    userId: string;

    @ManyToOne(
        () => {
          return Product;
        },
        (product) => {
          return product.cart;
        },
      )
    product: Product;

    @Column()
    qty: number;

    @Column()
    price: number;
    
    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
      createdAt: Date;

      @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
      updatedAt: Date;

      @DeleteDateColumn({
        type: 'timestamp with time zone',
        nullable: true,
      })
      deletedAt: Date;

}
