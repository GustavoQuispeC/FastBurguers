import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('storage')
export class StorageController {


    @Get()
    getStorageOrders(){}

    @Post()
    createOrder(){}

    @Delete()
    delelteOrder(){}
}
