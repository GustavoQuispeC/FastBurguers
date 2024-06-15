import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { CreateOrderStorageDto } from './storage.dto';
import { StorageService } from './storage.service';
import { AuthGuards } from 'src/guards/auth.guard';

@Controller('storage')
export class StorageController {

    constructor(
        private readonly  storageService:StorageService,
    ){}
    @Get(':id')
    @UseGuards(AuthGuards)
    getStorageByID(@Param('id', ParseUUIDPipe) id:string){
        return this.storageService.getByID(id)
    }

    @Post()
    @UseGuards(AuthGuards)
    createOrder(@Body() orderInfo:CreateOrderStorageDto){
        const {userId,products,...drinkInfo} = orderInfo;
        return this.storageService.createOrder(userId,products,drinkInfo)

    }   

    @Delete(':id')
    @UseGuards(AuthGuards)
    delelteOrder(@Param('id', ParseUUIDPipe) id:string){
        return this.storageService.delete(id)
    }
}
