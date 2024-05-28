import { OrderStatus } from "src/enum/orderstatus.enum";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetails } from "./orderdetails.entity";

@Entity({name:'statushistory'})
export class StatusHistory {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'enum', enum: OrderStatus, nullable: false})
    status: OrderStatus;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    timestamp:Date;

    @ManyToOne(() => OrderDetails, (orderdetails) => orderdetails.statushistory)
    @JoinColumn({name: 'orderdetails_id'})
    orderdetails: OrderDetails
}