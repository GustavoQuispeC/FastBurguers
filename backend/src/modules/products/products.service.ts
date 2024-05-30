import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { UpdatedProductdto, CreateProductdto } from './products.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>
    ){}

    async getAll(page:string, limit:string){
        try {
            const npage = Number(page)  
            const nlimit = Number(limit)
            if(npage<=0 || nlimit<=0) throw new Error();
            const products = await this.productsRepository.find({
                take: nlimit,
                skip: (npage-1)*nlimit
            })
            return products

        } catch (error) {
            throw new BadRequestException('Page and limit must be positive integers')
        }
    }

    async getById(id:string){
        const product = await this.productsRepository.findOneBy({id})
        if(!product) throw new NotFoundException(`No se encontro producto con ${id}`)
        return product;
    }

    async createProduct(product:CreateProductdto){
        const foundProduct = await this.productsRepository.findOneBy({name:product.name})
        if(foundProduct) throw new BadRequestException(`ya existe un producto con name: ${product.name}`)
        
        const category = product.category;
        const foundCategory = await this.categoriesRepository.findOneBy({name:category})
        if(!foundCategory) throw new BadRequestException(`Categoria:${product.category}  no existe en base de datos. Debera crea la categoria`)

        const objectProduct  = new Products();
        objectProduct.category = foundCategory;
        objectProduct.name = product.category
        objectProduct.description = product.description
        objectProduct.price = product.price
        objectProduct.imgUrl = product.imgUrl
        objectProduct.stock = product.stock
        objectProduct.discount = product.discount

        await this.productsRepository.createQueryBuilder()
            .insert()
            .into(Products)
            .values(objectProduct)
            .orIgnore(
                // ['description','price','imgUrl', 'stock','discount'], ['name']
            )
            .execute()

        return objectProduct;
    }

    async updateProduct(id:string, product:UpdatedProductdto){
        const productfound = await this.productsRepository.findOneBy({id})
        if(!productfound) throw new NotFoundException(`No se encontro producto con ${id}`)
        
        await this.productsRepository.update(id,product)
        const updatedProduct = await this.productsRepository.findOneBy({id});
        return updatedProduct;
    }
    
    async deleteProduct(id:string){
        const productfound = await this.productsRepository.findOneBy({id})
        if(!productfound) throw new NotFoundException(`No se encontro producto con ${id}`)
        await this.productsRepository.remove(productfound)
        return {
            message:`Producto ${id} eliminado con exito` 
        }
    }
}

