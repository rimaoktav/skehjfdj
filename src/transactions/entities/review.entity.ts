import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transactions } from "./transactions.entity";


@Entity()
export class Review {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Transactions, trans => trans.id, {onDelete: "CASCADE"})
    @JoinColumn()
    transaction: string;

    @Column({nullable: true})
    rate: number;

    @Column({nullable: true})
    message: string;
}