import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderdetails.entity";
import { Products } from "./products.entity";



@Entity({ name: 'orderdetails_products' })
export class OrderDetailsProducts {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ManyToOne(() => OrderDetails, (orderDetails) => orderDetails.orderDetailsProducts)
    orderDetails: OrderDetails;

    @ManyToOne(() => Products, (products) => products.orderDetailsProducts)
    products: Products;

    @Column({ type: 'int', nullable: false })
    quantity: number;
    
}