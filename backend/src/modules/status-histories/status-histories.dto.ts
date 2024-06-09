import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { OrderStatus } from "src/enum/orderstatus.enum";

export class CreateStatusDto {

    /**
     * @example 'en_preparacion'
     */
    @IsEnum(OrderStatus,
        {message: 'Order Must Be only: solicitud_recibida | en_preparacion |  en_camino | entregado'}
    )
    status: OrderStatus

}