import { Products } from "src/entities/products.entity";
import {IsNotEmpty, IsUUID, IsArray, ArrayMinSize, ArrayNotEmpty} from "class-validator"

export class OrdersDto {

    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    products: Partial<Products[]>

}

export class dateOrdersDto{ 

    @IsNotEmpty()
    date: Date

}