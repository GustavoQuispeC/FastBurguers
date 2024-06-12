import {Body, Controller, Param, Post } from '@nestjs/common';
import { PaymentsService} from './payments.service';
import { CreateOrderDto} from './dto/payments.dto';
import { MailerService } from 'src/modules/mailer/mailer.service';
import { MailerDto } from 'src/modules/mailer/mailer.dto';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentsService: PaymentsService,
        private readonly mailerService: MailerService
    ) {}

    @Post('create-order')
        async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.paymentsService.createOrder(createOrderDto.amount);
    }

    @Post('capture-order/:orderId')
        async captureOrder(@Param('orderId') orderId: string,
        @Body() mailerDto: MailerDto) {
            const orderDetails = {
                items: mailerDto.items, 
                totalAmount: mailerDto.totalAmount,
                orderId: mailerDto.orderId,
                customerName: mailerDto.customerName,
            };
        const capture = await this.paymentsService.captureOrder(orderId);
        await this.mailerService.sendMail(mailerDto.email, 'Confirmación de Compra', orderDetails)        
        return { message: 'Orden creada y correo enviado.', capture};
    }

}
