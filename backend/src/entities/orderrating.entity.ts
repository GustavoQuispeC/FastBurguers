import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Orders } from "./orders.entity";

@Entity()
export class OrderRating {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    rating: number;

    @Column({ nullable: true})
    comment: string;

    @ManyToOne(() => Users, user => user.orderRating)
    user: Users;

    @ManyToOne(() => Orders, order => order.orderRating)
    order: Orders
}