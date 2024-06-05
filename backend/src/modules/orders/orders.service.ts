import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDetails } from "src/entities/orderdetails.entity";
import { Orders } from "src/entities/orders.entity";
import { Products } from "src/entities/products.entity";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { dateOrdersDto } from "./orders.dto";


@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
        @InjectRepository(OrderDetails) private orderDetailsRepository: Repository<OrderDetails>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>
    ){}

    async addOrder(userId: string, products: any){
        let total = 0
        // verificamos que exista el usuario:
        const user = await this.usersRepository.findOneBy({id: userId})
        if(!user) {
            throw new NotFoundException(`Usuario con id ${userId} no encontrado`)
        }        
        // creamos la orden:
        const order = new Orders()
        order.date = new Date()
        order.user = user

        const newOrder = await this.ordersRepository.save(order)

        // asociamos cada id recibido con el Producto
        const productsArray = await Promise.all(
            products.map(async (element) => {
                // validar stock
                const foundStock = await this.productsRepository.findOne({ where: { name: element.name, price: 120 } })
                if(foundStock){
                    throw new Error(`El producto de ${foundStock}, ya no hay disponibles`)
                }
                // validar si existen los productos
                const product = await this.productsRepository.findOneBy({id: element.id})
                if(!product){
                    throw new NotFoundException(`Producto con id ${element.id} no encontrado`)
                }
                // calculamos el monto total:
                total += Number(product.price)
                // actualizamos el stock:
                await this.productsRepository.update(
                    {id: element.id},
                    {stock: product.stock - 1}
                )
                return product
            })
        )

        // creamos OrderDetail y la insertamos en BD:
        const orderDetails = new OrderDetails()

        orderDetails.price = Number(Number(total).toFixed(2)) // numero con 2 decimales
        orderDetails.products = productsArray
        orderDetails.order = newOrder
        await this.orderDetailsRepository.save(orderDetails)

        // enviamos al cliente la compra con la informacion de productos
        return await this.ordersRepository.find({
            where: {id: newOrder.id},
            relations: {orderDetails: true}
        })
    }

    async getOrder(id: string) {
        const order = await this.ordersRepository.findOne({
            where: {id},
            relations: {
                orderDetails: {products: true}
            }
        })

        if(!order) {
            throw new NotFoundException(`Orden con id ${id} no encontrada`)
        }
        return order
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
        await this.ordersRepository.remove(orderfound)
        return {
            message:`Orden con ${id} eliminado con exito` 
        }
    }

}
