import { Controller, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
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
    @Post()
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    addStatusHistory(@Param('id',ParseUUIDPipe) id_order:string, statusData: CreateStatusDto ){
        return this.statusHistoriesService.addStatus(statusData,id_order)
    }

}
