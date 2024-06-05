import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreateOrderDto } from './dto/payments.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.paymentsService.createOrder(createOrderDto.amount);
  }

  @Post('capture-order/:orderId')
  async captureOrder(@Param('orderId') orderId: string) {
    return await this.paymentsService.captureOrder(orderId);
  }

  @Post('cancel-order/:orderId')
  async cancelOrder(@Param('orderId') orderId: string) {
    return await this.paymentsService.cancelOrder(orderId);
  }
}
