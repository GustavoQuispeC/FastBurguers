
import { PickType } from "@nestjs/swagger";
import { AddOrderDto } from "../orders/orders.dto";
import { IsNumber, IsString } from "class-validator";


export class CreateOrderStorageDto extends PickType(AddOrderDto,['userId', 'products']){

    /**
    *Must be a String idUser
    *@example '"drink": "gaseosa cocacola"'
    */
    @IsString()
    drink: string

    /**
    *Must be a String idUser
    *@example '"drinkPrice": 22.4'
    */
    @IsNumber()
    drinkPrice: number
}