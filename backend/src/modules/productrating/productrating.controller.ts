import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRatingsService } from "./productrating.service";
import { CreateMultipleProductRatingsDto, CreateProductRatingDto } from "./productrating.dto";

@Controller('product-ratings')
export class ProductRatingsController{
    constructor( private readonly productRatingsService: ProductRatingsService) {}

    @Post('single')
    create(@Body() createProductRatingDto: CreateProductRatingDto){
        return this.productRatingsService.create(createProductRatingDto)
    }

    @Post()
    createMultipleProducts(@Body() createMultipleProductRatinsgDto: CreateMultipleProductRatingsDto){
        return this.productRatingsService.createMultipleProducts(createMultipleProductRatinsgDto)
    }

    @Get()
    findAll(){
        return this.productRatingsService.findAll();
    }
}