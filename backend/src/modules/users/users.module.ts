import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersQuery } from './users.query';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    controllers:[UsersController],
    providers:[UsersService,UsersQuery]
})
export class UsersModule {
}
