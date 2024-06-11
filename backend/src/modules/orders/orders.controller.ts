import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuards } from 'src/guards/auth.guard';
import { OrdersDto, dateOrdersDto } from './orders.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/enum/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}

    
    @ApiBearerAuth()
    @Get()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    getAllOrdes(){
        return this.ordersService.getAllOrder()
    }

    @ApiBearerAuth()
    @Get(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards, RolesGuard)
    getOrder(@Param('id', ParseUUIDPipe) id: string){
        return this.ordersService.getOrder(id)
    }

    @ApiBearerAuth()
    @Post()
    // @UseGuards(AuthGuards)
    addOrder(@Body() orders: OrdersDto){  
        const {userId, products, quantity} = orders
        return this.ordersService.addOrder(userId, products, quantity)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards, RolesGuard)
    update(@Body() orders: dateOrdersDto, @Param('id', ParseUUIDPipe) id: string){
        return this.ordersService.updateOrders(orders, id)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    deleteOrders(@Param('id',ParseUUIDPipe) id:string) {
        return this.ordersService.deleteOrders(id)
    }

}