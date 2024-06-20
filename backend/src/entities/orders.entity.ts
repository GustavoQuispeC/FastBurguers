import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { OrderDetails } from "./orderdetails.entity";
import { OrderRating } from "./orderrating.entity";

@Entity({
    name: 'orders'
})
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'timestamp'})
    date: Date;

    @Column({default:false})
    is_deleted:boolean;

    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: Users;

    @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetails;

    @OneToMany(() => OrderRating, orderRating => orderRating.order)
    orderRating: OrderRating
}