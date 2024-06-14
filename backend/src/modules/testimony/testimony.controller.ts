import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { CreateTestimonyDto } from './testimony.dto';

@Controller('testimony')
export class TestimonyController {
    constructor(private readonly testimonyService:TestimonyService){}

    @Get()
    getTestimonials(@Query('page') page:string, @Query('limit') limit:string){
        if(page && limit){
            return this.testimonyService.getTestimonials(page, limit)
        }
        return this.testimonyService.getTestimonials('1','10')
    }

    @Post()
    createTestimony(@Body() testimony: CreateTestimonyDto){
        return this.testimonyService.createTestimony(testimony)
    }
}
