import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AuthGuards } from 'src/guards/auth.guard';
import { retry } from 'rxjs';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

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
    getCategory(@Param('id',ParseUUIDPipe) id: string){
        return this.categoryService.getById(id)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    updateName(@Param('id',ParseUUIDPipe) id:string ,@Body() category:UpdateCategoryDto){
        return this.categoryService.updateName(id,category)
    }

    @ApiBearerAuth()
    @Post()
    // @Roles(Role.SUPERADMIN)
    // @UseGuards(AuthGuards,RolesGuard)
    createCategory(@Body() category:CreateCategoryDto){
        return this.categoryService.createCategory(category)
    }

    @ApiBearerAuth()
    @Delete(':id')
    // @Roles(Role.SUPERADMIN)
    // @UseGuards(AuthGuards,RolesGuard)
    deleteCategory(@Param('id',ParseUUIDPipe) id:string){
        return this.categoryService.deleteCategory(id)
    }

}
