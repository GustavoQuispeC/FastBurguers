import { Products } from "src/entities/products.entity";
import {IsNotEmpty, IsUUID, IsArray, ArrayMinSize} from "class-validator"

export class OrdersDto {
    
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsArray()
    // @ArrayNotEmpty()
    @ArrayMinSize(1)
    products: Partial<Products[]>

    // id: string;

    // date: Date;
}