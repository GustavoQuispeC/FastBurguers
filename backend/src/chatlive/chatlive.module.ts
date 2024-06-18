import { Module } from '@nestjs/common';
import { ChatsocketGateway } from './chatlive.gateway';

@Module({
    imports:[ChatsocketGateway]
})
export class ChatliveModule {}
