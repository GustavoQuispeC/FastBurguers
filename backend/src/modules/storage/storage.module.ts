import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageService } from './storage.service';
import { Storage } from 'src/entities/storage.entity';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Storage,Users,Products])],
    providers:[StorageService],
    controllers:[StorageController]
})
export class StorageModule {}
