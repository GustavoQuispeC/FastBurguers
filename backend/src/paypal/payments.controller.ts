import { Body, Controller, Post, Request } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { CreateOrderDto } from "./dto/payments.dto";

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService){}

    @Post('create-order')
    async createOrder(
        @Body() createOrderDto: CreateOrderDto) {
            return await this.paymentsService.createOrder(createOrderDto.amount)
        }
}