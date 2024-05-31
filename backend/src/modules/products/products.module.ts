import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Categories } from 'src/entities/categories.entity';
import { FileUploadRepository } from '../files/files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Products,Categories])],
  providers: [ProductsService, FileUploadRepository],
  controllers: [ProductsController]
})
export class ProductsModule {
  
}
