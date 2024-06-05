import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Inject,
  Param, ParseFilePipeBuilder,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { AuthGuards } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import {
  UpdatedProductdto,
  CreateProductdto,
  GetByCategoriesDto,
} from './products.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get('')
  getAllProducts() {
    return this.productService.getAll();
  }

  @Get('/query')
  getProducts(@Query('page') page: string, @Query('limit') limit: string) {
    if (page && limit) {
      return this.productService.getAllPage(page, limit);
    }
    return this.productService.getAllPage('1', '10');
  }

  @Get(':id')
  getProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getById(id);
  }

  @Post('/categories')
  getProductByCategory(@Body() categories: GetByCategoriesDto) {
    const { categories: arrayCategories } = categories;
    return this.productService.getProductByCategory(arrayCategories);
  }

    @ApiBearerAuth()
    @Post()
    // @Roles(Role.SUPERADMIN)
    // @UseGuards(AuthGuards,RolesGuard)
    @UseInterceptors(FileInterceptor('file'))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'create product with image',
        required: false,
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
                categoryID: { type: 'string', example: '908a59d6-a87f-4ea1-a89b-23747a668cf8' },
                size:{type:'string', example:'personal'}
            },
        },
    })
    async createProduct(
        @Body() product:CreateProductdto,
        @UploadedFile(
        //     new ParseFilePipeBuilder()
        // .addMaxSizeValidator({
        //     maxSize: 500000,
        //     message: 'El archivo es muy largo, el tamaño maximo es de 500KB',
        // })
        // .build({
        //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        // })
        ) file?: Express.Multer.File
    ){
        console.log(product);


        
        return this.productService.createProduct(product, file)
    }

  @ApiBearerAuth()
  @Put(':id')
  @Roles(Role.SUPERADMIN)
  @UseGuards(AuthGuards, RolesGuard)
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() product: UpdatedProductdto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productService.updateProduct(id, product, file);
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles(Role.SUPERADMIN)
  @UseGuards(AuthGuards, RolesGuard)
  deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.deleteProduct(id);
  }
}
