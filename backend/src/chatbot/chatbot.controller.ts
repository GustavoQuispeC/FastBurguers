import { BadRequestException, Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
    constructor(private readonly chatbotService: ChatbotService) {}

    @Post('message')
    async handleMessage(@Body() body: { userId: string; message: string }) {
        const { userId, message } = body;

        if (!userId || !message) throw new BadRequestException('userId y message son requeridos');

        try {
            const response = this.chatbotService.getNextStep(userId, message);
            return { response }; 
        } catch (error) {
            console.error('Error procesando el mensaje:', error);
            throw new InternalServerErrorException('Ha ocurrido un error al procesar tu mensaje. Por favor, intenta nuevamente.');
        }
        
    }
}
