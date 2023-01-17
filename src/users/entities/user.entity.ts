import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';


@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullname: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    unique: true
  })
  phone: string;


  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(
    () => {
      return Role;
    },
    (role) => {
      return role.id;
    },
  )
  role: Role;

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

  @VersionColumn()
  version: number;
}
