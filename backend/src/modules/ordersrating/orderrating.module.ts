import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRating } from "src/entities/orderrating.entity";
import { Orders } from "src/entities/orders.entity";
import { Users } from "src/entities/users.entity";
import { OrderRatingsService } from "./orderrating.service";
import { OrderRatingsController } from "./orderrating.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Users,Orders, OrderRating])],
    providers: [OrderRatingsService],
    controllers: [OrderRatingsController],
})

export class OrderRatingsModule {}