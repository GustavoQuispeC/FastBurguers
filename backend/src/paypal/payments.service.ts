import { Injectable } from "@nestjs/common";
import * as paypal from "@paypal/checkout-server-sdk";

@Injectable()
export class PaymentsService {
        private readonly clientId: string = process.env.YOUR_PAYPAL_CLIENT_ID;
        private readonly clientSecret: string = process.env.YOUR_PAYPAL_CLIENT_SECRET;
        private readonly environment: paypal.core.Environment = new paypal.core.SandboxEnvironment(this.clientId, this.clientSecret);
        private readonly client: paypal.PayPalHttpClient = new paypal.core.PayPalHttpClient(this.environment);

    

    async createOrder(amount: number): Promise<string> {
        const request = new paypal.orders.OrdersCreateRequest();
        request.prefer("return=representation");
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: amount.toString(),
                },
            }],
            // application_context:{
            //     brand_name:"fastburguers.com",
            //     user_action:"PAY_NOW",
            //     return_url: "http:localhost:4000/capture-order",
            //     cancel_url: "http:localhost:4000/cancel-order"

            // }
        });
    
        const response = await this.client.execute(request);
        console.log(response.result);
        
        return response.result.id;
    }

}