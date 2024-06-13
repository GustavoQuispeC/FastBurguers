import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { ProductRating } from "src/entities/productrating.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { CreateMultipleProductRatingsDto, CreateProductRatingDto } from "./productrating.dto";

@Injectable()
export class ProductRatingsService {
    constructor(
        @InjectRepository(ProductRating) private productRatingsRepository: Repository<ProductRating>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
    ){}

    async create(createProductRatingDto: CreateProductRatingDto): Promise<ProductRating> {
        const { productId, userId, rating, comment } = createProductRatingDto;

        const user = await this.usersRepository.findOne({ where: { id: userId}});
        const product = await this.productsRepository.findOne({where: {id:productId}});
        const orderdetails = await this.orderDetailsRepository.findOne({
            where: { products: {id: productId}, order: {user: { id: userId}}},
            relations: ['order', 'order.user', 'products'],
        });

        if(!user || !product || !orderdetails) throw new BadRequestException('User has not purchased this product');

        const productRating = this.productRatingsRepository.create({
            rating, comment, user, product
        });

        return this.productRatingsRepository.save(productRating);
    }

    async createMultiple(createMultipleProductRatingsDto: CreateMultipleProductRatingsDto): Promise<ProductRating[]>{
        const {userId, ratings } = createMultipleProductRatingsDto;

        const user = await this.usersRepository.findOne({ where: {id: userId}});

        if(!user) throw new BadRequestException('Invalid user ID');

        const productRatings: ProductRating[] = [];

        for(const ratingDto of ratings) {
            const { productId, rating, comment } = ratingDto;
            const product = await this.productsRepository.findOne({where: {id: productId}});
            const orderDetails = await this.orderDetailsRepository.findOne({
                where: { products: {id: productId}, order: { user: {id: userId}}},
                relations: ['order', 'order.user', 'products'],
            });

            if(!product || !orderDetails) throw new BadRequestException(`User has not pruchased the prodcut with ID ${productId}`);

            const productRating = this.productRatingsRepository.create({
                rating, comment, user, product
            });

            productRatings.push(productRating);
        }

        return this.productRatingsRepository.save(productRatings);
    }

    async findAll(): Promise<ProductRating[]> {
        return this.productRatingsRepository.find({ relations: ['user', 'product']});
    }
}