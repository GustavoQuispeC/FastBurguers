import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderRating } from "src/entities/orderrating.entity";
import { Orders } from "src/entities/orders.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { CreateOrderRatingDto } from "./orderrating.dto";

@Injectable()
export class OrderRatingsService {
    constructor(
        @InjectRepository(OrderRating) private orderRatingsRepository: Repository<OrderRating>,
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(Users) private userRepository: Repository<Users>
    ) {}

    async create(createOrderRatingDto:CreateOrderRatingDto): Promise<OrderRating> {
        const {orderId, userId, rating, comment } = createOrderRatingDto;
        const order = await this.ordersRepository.findOne({ where: {id: orderId}, relations: ['user']});
        const user = await this.userRepository.findOne({ where: {id: userId}});

        if (!order || !user || order.user.id !== user.id) throw new BadRequestException('User has not purchased this order');

        const orderRating = this.orderRatingsRepository.create({
            rating,
            comment,
            order,
            user
        });

        return this.orderRatingsRepository.save(orderRating);
    }

    async findAll(): Promise<OrderRating[]> {
        return this.orderRatingsRepository.find({ relations: ['user', 'order']});
    }
}