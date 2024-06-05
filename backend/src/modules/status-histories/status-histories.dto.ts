import { IsDate, IsEnum, IsUUID } from "class-validator";
import { OrderStatus } from "src/enum/orderstatus.enum";

export class CreateStatusDto {

    @IsEnum(OrderStatus,
        {message: 'Order Must Be only: solicitud_recibida | en_preparacion |  en_camino | entregado'}
    )
    status: OrderStatus

    @IsDate()
    timestamp:Date

}