import { Module } from '@nestjs/common';
import { StatusHistoriesController } from './status-histories.controller';
import { StatusHistoriesService } from './status-histories.service';

@Module({
  controllers: [StatusHistoriesController],
  providers: [StatusHistoriesService]
})
export class StatusHistoriesModule {}
