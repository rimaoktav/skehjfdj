import { Cart } from "src/cart/entities/cart.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity()

export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({nullable: true})
    image: string

    @Column()
    price: number

    @Column()
    stok: number

    @ManyToOne(
        () => {return User},
        (user) => {return user.id},
    )
    user: User

    @ManyToOne(
        () => {return Category},
        (category) => {return category.id},
    )
    category: Category


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

      @ManyToOne(
        () => {
          return Cart;
        },
        (cart) => {
          return cart.product;
        },
      )
      cart: Cart;

}