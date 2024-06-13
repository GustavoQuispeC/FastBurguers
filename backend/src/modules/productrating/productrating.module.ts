import { Module } from "@nestjs/common";
import { ProductRatingsService } from "./productrating.service";
import { ProductRatingsController } from "./productrating.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Products } from "src/entities/products.entity";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Users } from "src/entities/users.entity";
import { ProductRating } from "src/entities/productrating.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Users,OrderDetails, Products, ProductRating])],
    providers: [ProductRatingsService],
    controllers: [ProductRatingsController],
})

export class ProductRatingsModule {}