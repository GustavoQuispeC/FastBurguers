import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { AuthGuards } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdatedProductdto, CreateProductdto } from './products.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productService:ProductsService
    ){}



    @Get()
    getProducts(@Query('page') page:string, @Query('limit') limit:string){
        if(page && limit){
            return this.productService.getAll(page,limit)
        }
        return this.productService.getAll('1','10')
    }

    @ApiBearerAuth()
    @Get(':id')
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    getProduct(@Param('id',ParseUUIDPipe) id:string){
        return this.productService.getById(id)
    }

    @ApiBearerAuth()
    @Post()
    @Roles(Role.ADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    createProduct(@Body() product:CreateProductdto){
        return this.productService.createProduct(product)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    updateProduct(@Param('id',ParseUUIDPipe) id:string, @Body() product: UpdatedProductdto){
        return this.productService.updateProduct(id,product)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard) 
    deleteProduct(@Param('id',ParseUUIDPipe) id:string,){
        return this.productService.deleteProduct(id)
    }

}
