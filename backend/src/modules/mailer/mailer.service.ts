import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false,
            auth: {
                user:process.env.MAIL,
                pass:'pmfx rcvv dwwg wzih'
            },
        });
    }

    async sendMail(to: string, subject: string, orderDetails: any) {
        const { items, totalAmount, orderId, customerName } = orderDetails;

    const itemList = items.map((item: any) => 
        `<li>${item.quantity} x ${item.name} - $${item.price.toFixed(2)}</li>`
    ).join('');

    const htmlContent = `
        <h1>Gracias por tu compra, ${customerName}!</h1>
        <p>Tu orden ha sido recibida con el ID: ${orderId}</p>
        <h2>Detalles de la Compra:</h2>
        <ul>${itemList}</ul>
        <p><strong>Total: $${totalAmount.toFixed(2)}</strong></p>
        <p>Gracias por elegir nuestra tienda!</p>
    `;
        const info = await this.transporter.sendMail({
            from: `FastBurguers ${process.env.MAIL}`,
            to,
            subject,
            html: htmlContent,
        });

        console.log('Mensaje neviado: %s', info.messageId);
        
    }
}