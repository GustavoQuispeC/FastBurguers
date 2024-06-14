
import { PickType } from "@nestjs/swagger";
import { AddOrderDto } from "../orders/orders.dto";


export class CreateOrderStorageDto extends PickType(AddOrderDto,['userId', 'products']){

}