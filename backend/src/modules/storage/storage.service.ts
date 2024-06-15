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
        
        let drinkGlobal="" , drinkPriceGlobal=0;    
        const publicItems = await Promise.all( items.map(async (element) =>{
            const {idProduct, quantity,drink,drinkPrice,sizeProduct} = element;
            const productInfo = await this.productsRepository.createQueryBuilder('products')
            .leftJoinAndSelect('products.category', 'category')
            .where('products.id = :id', { id: idProduct })
            .select([
                'products.id',
                'products.name',
                'products.description',
                'products.price',
                'products.stock',
                'products.imgUrl',
                'products.discount',
                'category.name'
            ])
            .getOne();
            drinkGlobal=drink;drinkPriceGlobal=drinkPrice;
                
            return {
                ...productInfo,
                sizeProduct,
                quantity
            }
            })
        )
        

        return {products:publicItems,drink:drinkGlobal,drinkPrice:drinkPriceGlobal}
        
    }
    async createOrder(idUser:string,products:ProductInfo[],drinkInfo:any){

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
                        quantity:product.quantity,
                        sizeProduct:product.sizeProduct,
                        drink:drinkInfo.drink,
                        drinkPrice:drinkInfo.drinkPrice
                    })
                }else{
                    const item = this.storageRepository.create({
                        idUser,
                        idProduct:product.id,
                        quantity:product.quantity,
                        sizeProduct:product.sizeProduct,
                        drink:drinkInfo.drink,
                        drinkPrice:drinkInfo.drinkPrice
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
