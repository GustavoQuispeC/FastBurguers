import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderRatingsService } from "./orderrating.service";
import { CreateOrderRatingDto } from "./orderrating.dto";

@Controller('order-ratings')
export class OrderRatingsController {
    constructor(private readonly orderRatingsService: OrderRatingsService){}

    @Post()
    create (
        @Body() createOrderRatingDto: CreateOrderRatingDto
    ){
        return this.orderRatingsService.create(createOrderRatingDto);
    }

    @Get()
    findAll(){
        return this.orderRatingsService.findAll();
    }
}