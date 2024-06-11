import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { StatusHistoriesService } from './status-histories.service';
import { CreateStatusDto } from './status-histories.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { AuthGuards } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('status-histories')
export class StatusHistoriesController {

    constructor(
        private readonly statusHistoriesService:StatusHistoriesService,
    ){}

    @ApiBearerAuth()
    @Post(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    registerStatusHistory(@Param('id',ParseUUIDPipe) id_order:string, @Body() statusData: CreateStatusDto ){
        return this.statusHistoriesService.registerStatus(id_order,statusData)
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuards)
    findStatus(@Param('id',ParseUUIDPipe) id_order:string){
        return this.statusHistoriesService.getStatus(id_order)
    }
        
}
