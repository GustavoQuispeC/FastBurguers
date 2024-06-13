import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";
import { Products } from "./products.entity";

@Entity({name: 'product_ratings'})
export class ProductRating {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rating: number;

    @Column({nullable: true})
    comment: string;

    @ManyToOne(() => Users, (user) => user.productRatings)
    user: Users;
    
    @ManyToOne(() => Products, (product) => product.productRatings)
    product: Products;
}