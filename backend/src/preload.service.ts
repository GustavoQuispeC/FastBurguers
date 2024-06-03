import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { Products } from './entities/products.entity';
import { Categories } from './entities/categories.entity';
import * as data from './data/data.json'
import { SizeProduct } from './enum/sizeProduct.enum';


@Injectable()
export class PreloadService implements OnModuleInit {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>
    ){}

    async delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async addDefaultSuperAdmin(){
        const defaultUser = {
            email: "adminTest@gmail.com",
            name: "Admin01",
            password: "1234aA#abc",
            isAdmin:true,
            isSuperAdmin:true,
            phone: 123456789,
            country: "España",
            address: "EnriqueDelgado",
            city:"Madrid",
        }
        const foundAdmin = await this.usersRepository.findOneBy({email:defaultUser.email})
        if(!foundAdmin){
            const hashedPass = await bcrypt.hash(defaultUser.password,10)
            await this.usersRepository.save({...defaultUser,password:hashedPass})
        }
        console.log("Precarga de SuperAdminDefault") 
    }

    async addDefaultCategories(){
        data?.map(async (element)=>{
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

    const productsToUpsert = data.map((element) => {
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


    async onModuleInit() {
        await this.addDefaultCategories();
        await this.delay(1000); 
        await this.addDefaultSuperAdmin();
        await this.addDefaultProducts()
    }
}
