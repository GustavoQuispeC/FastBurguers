import { Injectable, NotAcceptableException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusHistory } from 'src/entities/statushistory.entity';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './status-histories.dto';
import { OrderDetails } from 'src/entities/orderdetails.entity';
import { Orders } from 'src/entities/orders.entity';
<<<<<<< HEAD
=======
import { timeStamp } from 'console';
import { timestamp } from 'rxjs';
>>>>>>> 21d187e76b4c947a57cbd59593dd87b742f3b4a2

@Injectable()
export class StatusHistoriesService {

    constructor(
        @InjectRepository(StatusHistory) private statusHistRepository: Repository<StatusHistory>,
        @InjectRepository(OrderDetails) private orderDetailRepository: Repository<OrderDetails>,
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    )
    {}
    

    async registerStatus(idOrder:string,statusData: any){

        const orderFound = await this.ordersRepository.findOne({
            where: { id: idOrder },
            relations: ['orderDetails'],
        });
        if(!orderFound) throw new NotAcceptableException(`Orden ${idOrder} no encontrado`)

        const id = orderFound.orderDetails.id
        const orderDetailFound = await this.orderDetailRepository.findOneBy({id})
        if(!orderDetailFound) throw new UnprocessableEntityException('No es posible procesar solicitud, error en la base de datos de ordenes de compra');

        const statusFound = await this.statusHistRepository.find({
            where: {
                orderdetails: { id },
            },
            relations: ['orderdetails'], 
            });
  
        const hasStatus = statusFound.some((element)=>element.status === statusData.status)
        if(hasStatus) throw new NotAcceptableException(`La orden ya tiene creado el status: ${statusData.status}`)
<<<<<<< HEAD

        const statusHistory  = this.statusHistRepository.create({orderdetails:orderDetailFound,...statusData})
=======
        
        const completeStatus = {...statusData,timestamp:new Date()}
        const statusHistory  = this.statusHistRepository.create({orderdetails:orderDetailFound,...completeStatus})
>>>>>>> 21d187e76b4c947a57cbd59593dd87b742f3b4a2
        return this.statusHistRepository.save(statusHistory)
    }

    async getStatus(idOrder:string){
        const orderFound = await this.ordersRepository.findOne({
            where: { id: idOrder },
            relations: ['orderDetails'],
        });
        if(!orderFound) throw new NotAcceptableException(`Orden ${idOrder} no encontrado`)

        const id = orderFound.orderDetails.id
        const orderDetailFound = await this.orderDetailRepository.findOneBy({id})
        if(!orderDetailFound) throw new UnprocessableEntityException('No es posible procesar solicitud, error en la base de datos de ordenes de compra');

        const statusFound = await this.statusHistRepository.find({
            where: {
                orderdetails: { id: id },
            }
            });
        
        return statusFound.map((element) => {
            return {status:element.status,timestamp:element.timestamp}
        });
    }

}
