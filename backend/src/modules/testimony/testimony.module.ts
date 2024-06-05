import { Module } from '@nestjs/common';
import { TestimonyService } from './testimony.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testimony } from 'src/entities/testimony.entity';
import { TestimonyController } from './testimony.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Testimony])],
  controllers:[TestimonyController],
  providers: [TestimonyService]
})
export class TestimonyModule {}
