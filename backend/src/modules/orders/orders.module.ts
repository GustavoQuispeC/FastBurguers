import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/entities/orders.entity';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';
import { StatusHistoriesModule } from '../status-histories/status-histories.module';


@Module({
  imports: [TypeOrmModule.forFeature([Orders, OrderDetails, Users, Products]),StatusHistoriesModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
