import { Body, Controller, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}

    @Post('message')
    handleMessage(@Body() body: { userId: string; message: string }) {
        const { userId, message } = body;
        const response = this.chatbotService.getNextStep(userId, message);
        return { response };
    }
}
