import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { ProductInfo, dateOrdersDto } from "./orders.dto";
import { StatusHistoriesService } from "../status-histories/status-histories.service";
import { OrderStatus } from "src/enum/orderstatus.enum";
import { OrderDetailsProducts } from "src/entities/ordersdetailsProduct.entity";
import { OrdersQuery } from "./orders.queries";



@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(OrderDetailsProducts) private ordDetailProdRepository: Repository<OrderDetailsProducts>,
        private readonly statusHistoriService:StatusHistoriesService,
        private readonly ordersQuery: OrdersQuery,
    ){}

    async addOrder(userId: string, products_info: ProductInfo[]){
        let total = 0
        // verificamos que exista el usuario
        const user = await this.usersRepository.findOneBy({id: userId,is_deleted:false})
        if(!user) throw new NotFoundException(`Usuario con id ${userId} no encontrado`)        
        if(!user.condition) throw new ForbiddenException(`Usuario ${user.id} esta inhabilitado`)        

        const order = this.ordersRepository.create({user, date:new Date()}) 
        const newOrder = await this.ordersRepository.save(order)

        // verificamos y calculamos cantidad
        const products = await Promise.all(
            products_info.map(async (element) => {
                
                // validar si existen los productos
                const product = await this.productsRepository.findOneBy({id: element.id})
                if(!product)throw new NotFoundException(`Producto id ${element.id} no encontrado`)
                
                //validamos stock
                if(product.stock<=0) throw new BadRequestException(`Producto id ${product.stock} fuera en stoc`)
                
                // calculamos el monto total:
                total += (Number(product.price)*Number(element.quantity)*Number(1-product.discount))
                // actualizamos el stock:
                await this.productsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1}
                )
                return product
            })
        )

        // order details
        const orderDetails = this.orderDetailsRepository.create(
            {   amount: Number(total.toFixed(2)),
                order: newOrder
            }
        )
        await this.orderDetailsRepository.save(orderDetails)

        // order detail products tabla intermedia
        await Promise.all(
            products_info.map(async (element) => {
                const product = await this.productsRepository.findOneBy({id: element.id})
                const orDetaProd = this.ordDetailProdRepository.create({
                    products: product,
                    orderDetails,
                    quantity: element.quantity
                })

                await this.ordDetailProdRepository.save(orDetaProd)
            })
        )

        // registramos status
        const infoStatus =  {status:OrderStatus.SOLICITUD_RECIBIDA}
        await this.statusHistoriService.registerStatus(newOrder.id,infoStatus)


        return await this.ordersQuery.getOrder(newOrder.id)
    }

    async getOrder(id: string) {
        const order = await this.ordersQuery.getOrder(id)
        if(!order) {
            throw new NotFoundException(`Orden con id ${id} no encontrada`)
        }
        return order
    }

    async getAllOrder(){
        const orders = await this.ordersQuery.getOrders()
        return orders;
    }

    async updateOrders(orders: dateOrdersDto, id: string) {
        const orderfound = await this.ordersRepository.findOneBy({id})
        if(!orderfound) throw new NotFoundException(`No se encontro la orden con ${id}`)
        
        await this.ordersRepository.update(id,orders)
        const updatedOrder = await this.ordersRepository.findOneBy({id});
        return updatedOrder;
    }

    async deleteOrders(id: string) {
        const orderfound = await this.ordersRepository.findOneBy({id})
        if(!orderfound) throw new NotFoundException(`No se encontro la orden con ${id}`)
        await this.ordersRepository.update(id,{is_deleted:true})
        return {
            message:`Orden con ${id} eliminado con exito` 
        }
    }
}
