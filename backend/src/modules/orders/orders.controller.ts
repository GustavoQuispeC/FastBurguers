import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/guards/auth.guard';
import { OrdersDto } from './orders.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

    @Get(':id')
    @UseGuards(AuthGuards)
    getOrder(@Param('id') id: string){
        return this.ordersService.getOrder(id)
    }

    @Post()
    @UseGuards(AuthGuards)
    addOrder(@Body() orders: OrdersDto){  // orders: any
        const {userId, products} = orders
        console.log(orders)
        return this.ordersService.addOrder(userId, products)
    }

    // @Put(':id')
    // update(@Body() orders: OrdersDto, @Param('id') id: string){
    //     return this.ordersService.updateOrders(orders, id)
    // }

}