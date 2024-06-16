
import { PickType } from "@nestjs/swagger";
import { AddOrderDto } from "../orders/orders.dto";
import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateOrderStorageDto extends PickType(AddOrderDto,['userId', 'products']){
}