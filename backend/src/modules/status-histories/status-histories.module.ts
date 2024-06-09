import { Module } from '@nestjs/common';
import { StatusHistoriesController } from './status-histories.controller';
import { StatusHistoriesService } from './status-histories.service';
import { Orders } from 'src/entities/orders.entity';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { StatusHistory } from 'src/entities/statushistory.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Orders, OrderDetails, StatusHistory])],
  controllers: [StatusHistoriesController],
  providers: [StatusHistoriesService],
  exports: [StatusHistoriesService]
})
export class StatusHistoriesModule {}
