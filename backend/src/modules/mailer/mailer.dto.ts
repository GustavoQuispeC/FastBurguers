import { Type } from "class-transformer";

export class MailerDto {

    email:string;
    @Type(() => OrderItemDto)
    items: OrderItemDto[];
    totalAmount: number;
    orderId: string;
    customerName: string;
    
}


class OrderItemDto {
    name: string;
    quantity: number;
    price: number;
}