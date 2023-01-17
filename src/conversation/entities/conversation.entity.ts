import { User } from "src/users/entities/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Cnonversation {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(
        () => {return User},
        (user) => {return user.id},
    )
    userOne: User

    @ManyToOne(
        () => {return User},
        (user) => {return user.id},
    )
    userTwo: User

}