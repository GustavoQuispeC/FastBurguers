import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from 'src/entities/storage.entity';
import { Repository } from 'typeorm';
import { ProductInfo } from '../orders/orders.dto';
import { Users } from 'src/entities/users.entity';
import { Products } from 'src/entities/products.entity';

@Injectable()
export class StorageService {

    constructor(
        @InjectRepository(Storage) private storageRepository: Repository<Storage>,
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
    ){}

    async getByID(idUser:string){

        const items = await this.storageRepository.find({
            where:{
                idUser
            }
        })
        if(!items) throw new NotFoundException(`No se encontro storage del usuario: ${idUser}`) 
        const publicItems =  items.map((element) =>{
            const {id,idUser, ...info} = element
            return info
        })  
        
        return publicItems
        
    }
    async createOrder(idUser:string,products:ProductInfo[]){

        const userFound = await this.usersRepository.findOneBy({id:idUser})
        if(!userFound) throw new NotFoundException(`No existe el usuario: ${idUser}`) 

        // check if product exist in database
            await Promise.all(
                products.map(async (product)=>{
                    const productFound = await this.productsRepository.findOneBy({id:product.id})
                    if(!productFound) throw new NotFoundException(`No existe el producto: ${idUser}`)
                })
            
            )
        
        // save data
        await Promise.all(
            products.map(async (product)=>{
                const itemFound = await this.storageRepository.findOneBy({
                    idProduct:product.id,
                    idUser
                })
                if(itemFound){
                    await this.storageRepository.update(itemFound.id,{
                        quantity:product.quantity
                    })
                }else{
                    const item = this.storageRepository.create({
                        idUser,
                        idProduct:product.id,
                        quantity:product.quantity
                    })
                    await this.storageRepository.save(item)
                }
            })
        )
        return {
            message:'Se guardo la orden'
        }
    }

    async delete(idUser:string){
        const items =  await this.storageRepository.find({
                where:{
                    idUser
                }
            })
        
        if(items.length === 0) throw new NotFoundException(`No se encontro storage del usuario: ${idUser}`)
        await Promise.all(
            items.map(async(product)=>{
                await this.storageRepository.delete(product)
            })
        )
        return {
            message:`se elimino local storage de user ${idUser}`
        }
    }

}
