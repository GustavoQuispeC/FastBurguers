import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuards } from 'src/guards/auth.guard';
import { retry } from 'rxjs';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    
    constructor(private readonly categoryService:CategoriesService){
    }


    @Get()
    getCategories(page:string, limit:string){
        if(page&&limit){
            return this.categoryService.getAll(page,limit)
        }
        return this.categoryService.getAll('1','10')
    }

    @Get(':id')
    @UseGuards(AuthGuards)
    getCategory(@Param('id',ParseUUIDPipe) id:
    string){
        return this.categoryService.getById(id)
    }

    @Put(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    updateName(@Param('id',ParseUUIDPipe) id:string ,@Body() name:string){
        return this.categoryService.updateName(id,name)
    }

    @Post()
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    createCategory(@Body() name:string){
        return this.categoryService.createCategory({name})
    }

    @Delete()
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    deleteCategory(@Param('id',ParseUUIDPipe) id:string){
        return this.categoryService.deleteCategory(id)
    }

}
