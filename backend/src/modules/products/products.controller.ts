import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { AuthGuards } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UpdatedProductdto, CreateProductdto } from './products.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';


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

    @Get(':id')
    getProduct(@Param('id',ParseUUIDPipe) id:string){
        return this.productService.getById(id)
    }

    @ApiBearerAuth()
    @Post()
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'create product with image',
        required: true,
        type: 'multipart/form-data',
        schema: {
            type:'object',
            properties: {
                file: {
                    type:'string',
                    format: 'binary',
                },
                name: { type: 'string', example: 'La churrita' },
                description: { type: 'string', example: 'La atora venas'},
                price: { type: 'number', example: 12.34 },
                stock: { type: 'number', example: 10 },
                discount: { type: 'number', example: 0.1 },
                category: { type: 'string', example: 'Hamburguesas' },
            },
        },
    })
    async createProduct(
        @Body() product:CreateProductdto,
        @UploadedFile() file: Express.Multer.File
    ){
        return this.productService.createProduct(product, file)
    }

    @ApiBearerAuth()
    @Put(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Update product with optional image',
        required: false,
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number', example: 12.34 },
                stock: { type: 'number', example: 10 },
                discount: { type: 'number', example: 0.1 },
                category: { type: 'string', example: 'Hamburguesas' },
            },
        },
    })
    updateProduct(
        @Param('id',ParseUUIDPipe) id:string,
        @Body() product: UpdatedProductdto,
        @UploadedFile() file?: Express.Multer.File){
        return this.productService.updateProduct(id,product, file)
    }

    @ApiBearerAuth()
    @Delete(':id')
    @Roles(Role.SUPERADMIN)
    @UseGuards(AuthGuards,RolesGuard) 
    deleteProduct(@Param('id',ParseUUIDPipe) id:string,){
        return this.productService.deleteProduct(id)
    }

}
