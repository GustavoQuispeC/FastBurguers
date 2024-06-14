import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersQuery {
    constructor(
        @InjectRepository(Users) private userRespository:Repository<Users>
    ){}


    async getUser(id:string){

        const user = await this.userRespository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.orders', 'orders')
        .leftJoinAndSelect('orders.orderDetails', 'orderDetails')
        .leftJoinAndSelect('orderDetails.orderDetailsProducts', 'orderDetailsProducts')
        .leftJoinAndSelect('orderDetailsProducts.products', 'products')
        .leftJoinAndSelect('orderDetails.statushistory', 'statushistory')
        .where('user.id = :id', { id })
        .andWhere('user.is_deleted = :is_deleted', { is_deleted: false })
        .select([
            'user',
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

        return user

    }
}
