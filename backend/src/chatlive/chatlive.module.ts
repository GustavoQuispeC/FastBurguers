import { Module } from '@nestjs/common';
import { ChatsocketGateway } from './chatlive.gateway';
import { AdminGateway } from './admin.gateway';

@Module({
    imports:[ChatsocketGateway,AdminGateway]
})
export class ChatliveModule {}
