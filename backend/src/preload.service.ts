import { Inject, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { Products } from './entities/products.entity';
import { Categories } from './entities/categories.entity';
import * as dataProducts from './data/dataProducts.json'
import { OrdersService } from './modules/orders/orders.service';
import * as dataComentarios from './data/dataComentarios.json'
import * as dataUsers from './data/dataUsers.json'
import { Testimony } from './entities/testimony.entity';
import { copyFileSync } from 'fs';
import { SizeProduct } from './enum/sizeProduct.enum';


@Injectable()
export class PreloadService implements OnModuleInit {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
        @InjectRepository(Testimony) private testimonyRepository: Repository<Testimony>,
        private readonly ordersService: OrdersService,
    ){}

    async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    async addDefaultOrder(){
        const users = await this.usersRepository.find()
        const products = await this.productsRepository.find()

        await this.ordersService.addOrder(users[0].id,
            [{id:products[0].id,quantity:2,size:SizeProduct.CLASICA}, 
            {id:products[2].id,quantity:2,size:SizeProduct.MEDIANA}]
        );
        console.log("Precarga de Order")
    }

    async addDefaultUser(defaultUser:  any){
        const foundAdmin = await this.usersRepository.findOneBy({email:defaultUser.email})
        if(!foundAdmin){
            const hashedPass = await bcrypt.hash(defaultUser.password,10)
            await this.usersRepository.save({...defaultUser,password:hashedPass})
        }
        console.log("Precarga de Usuario") 
    }

    async addDefaultCategories(){
        dataProducts?.map(async (element)=>{
            await this.categoriesRepository.createQueryBuilder()
                .insert()
                .into(Categories)
                .values({name: element.category})
                .orIgnore()
                .execute();
        })
        console.log("Precarga de categorias")
    }

    async addDefaultProducts(){
        const categories = await this.categoriesRepository.find();

    const productsToUpsert = dataProducts.map((element) => {
        const categoryObject = categories.find(
            (category) => category.name === element.category
        );

        if (!categoryObject) {
            throw new InternalServerErrorException(`No existe la categoria ${element.category} en la base de datos`);
        }

        const product = new Products();
        product.name = element.name;
        product.description = element.description;
        product.price = element.price;
        product.imgUrl = element.imgUrl;
        product.stock = element.stock;
        product.discount = element.discount;
        product.category = categoryObject;

        return product;
    });

    for (const product of productsToUpsert) {
        await this.productsRepository
            .createQueryBuilder()
            .insert()
            .into(Products)
            .values({
                name: product.name,
                description: product.description,
                price: product.price,
                imgUrl: product.imgUrl,
                stock: product.stock,
                discount: product.discount
            })
            .orUpdate(
                ['description', 'price', 'imgUrl', 'stock', 'discount'], 
                ['name']
            )
            .execute();

        const savedProduct = await this.productsRepository.findOne({ where: { name: product.name } });
        if (savedProduct) {
            await this.productsRepository
                .createQueryBuilder()
                .relation(Products, 'category')
                .of(savedProduct)
                .set(product.category);
        }
    }

    console.log('Precarga de productos');
    }

    async addDefaultTestimonies(){

        const comments = await this.testimonyRepository.find();
        if(comments.length >= 1) 
            {console.log("Se cargo data de testimonios") ;return}

        await Promise.all(
            dataComentarios.map(async(element)=>{
                const commnet =this.testimonyRepository.create({
                    name:element.name,
                    email:element.email,
                    description:element.description,
                    punctuation:element.punctuation
                })

                await this.testimonyRepository.save(commnet)
            })
        )

        console.log("Se cargo data de testimonios")

    }

    async onModuleInit() {

        const defaultSuperAdmin = dataUsers[0].defaultSuperAdmin
        const defaultAdmin =  dataUsers[0].defaultAdmin
        const defaultUser =  dataUsers[0].defaultUser

        await this.addDefaultCategories();
        await this.delay(1000); 
        await this.addDefaultUser(defaultSuperAdmin);
        await this.addDefaultProducts()
        await this.addDefaultUser(defaultAdmin);
        await this.addDefaultOrder();
        await this.addDefaultUser(defaultUser);
        await this.addDefaultTestimonies();
    }
}
