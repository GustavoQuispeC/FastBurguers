import { Module } from "@nestjs/common";
import { MailerService } from "./mailer.service";

@Module({
    imports: [],
    providers: [MailerService],
    controllers: [],
})

export class MailerModule {}