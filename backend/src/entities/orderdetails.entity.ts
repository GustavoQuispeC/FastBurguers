import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { StatusHistory } from "./statushistory.entity";
import { OrderDetailsProducts} from "./ordersdetailsProduct.entity";

@Entity({
    name: 'orderdetails'
})
export class OrderDetails {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'decimal', precision: 10, scale: 2})
    amount: number;

    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({name: 'order_id'})
    order: Orders;

    @OneToMany(() => OrderDetailsProducts, (orderDetailsProducts) => orderDetailsProducts.orderDetails)
    orderDetailsProducts: OrderDetailsProducts[];

    @OneToMany(() => StatusHistory, (statushistory) => statushistory.orderdetails)
    @JoinColumn()
    statushistory: StatusHistory[];
}