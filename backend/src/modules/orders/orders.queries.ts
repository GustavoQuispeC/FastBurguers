import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "src/entities/orders.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrdersQuery {

    constructor(
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    ){}

    async getOrder(id:string){
        return await this.ordersRepository
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.orderDetailsProducts', 'orderDetailsProducts')
        .leftJoinAndSelect('orderDetailsProducts.products', 'products')
        .leftJoinAndSelect('orderDetails.statushistory','statushistory')
        .where('orders.id = :id', { id})
        .andWhere('orders.is_deleted = :isdeleted',{isdeleted:false})
        .select([
        'orders.id',
        'orders.date',
        'orderDetails.amount',
        'statushistory.status',
        'statushistory.timestamp',
        'orderDetailsProducts.quantity',
        'products.name',
        'products.price',
        'products.discount',
        'products.imgUrl'
        ])
        .getOne();
    }

    async getOrders(){
        return await this.ordersRepository
        .createQueryBuilder('orders')
        .leftJoinAndSelect('orders.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.orderDetailsProducts', 'orderDetailsProducts')
        .leftJoinAndSelect('orderDetailsProducts.products', 'products')
        .leftJoinAndSelect('orderDetails.statushistory','statushistory')
        .where('orders.is_deleted = :isdeleted',{isdeleted:false})
        .select([
        'orders.id',
        'orders.date',
        'orderDetails.amount',
        'statushistory.status',
        'statushistory.timestamp',
        'orderDetailsProducts.quantity',
        'products.name',
        'products.price',
        'products.discount',
        'products.imgUrl'
        ])
        .getMany();
    }

}