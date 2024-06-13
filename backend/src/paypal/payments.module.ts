import { Module } from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";
import { MailerService } from "src/modules/mailer/mailer.service";

@Module({
    imports: [],
    providers: [PaymentsService, MailerService],
    controllers: [PaymentsController]
  })
  export class PaymentsModule {
    
  }