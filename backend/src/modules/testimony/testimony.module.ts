import { Module } from '@nestjs/common';
import { TestimonyService } from './testimony.service';

@Module({
  providers: [TestimonyService]
})
export class TestimonyModule {}
