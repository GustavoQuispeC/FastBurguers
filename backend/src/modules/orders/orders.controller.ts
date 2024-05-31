import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/guards/auth.guard';
import { OrdersDto, dateOrdersDto } from './orders.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

    @Get(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards, RolesGuard)
    getOrder(@Param('id') id: string){
        return this.ordersService.getOrder(id)
    }

    @Post()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards, RolesGuard)
    addOrder(@Body() orders: OrdersDto){  
        const {userId, products} = orders
        console.log(orders)
        return this.ordersService.addOrder(userId, products)
    }

    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards, RolesGuard)
    update(@Body() orders: dateOrdersDto, @Param('id') id: string){
        return this.ordersService.updateOrders(orders, id)
    }

    @Delete(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    deleteOrders(@Param('id',ParseUUIDPipe) id:string) {
        return this.ordersService.deleteOrders(id)
    }

}