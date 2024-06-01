import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Products } from 'src/entities/products.entity';
import { In, Repository } from 'typeorm';
import { UpdatedProductdto, CreateProductdto } from './products.dto';
import { FileUploadRepository } from '../files/files.repository';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products) private productsRepository: Repository<Products>,
        @InjectRepository(Categories) private categoriesRepository: Repository<Categories>,
        private readonly fileUploadRepository: FileUploadRepository
    ){}


    async getAll(){
        const allProducts = await this.productsRepository.find({
            relations:{
                category:true
            }
        })

        return allProducts;
    }

    async getAllPage(page:string, limit:string){
        try {
            const npage = Number(page)  
            const nlimit = Number(limit)
            if(npage<=0 || nlimit<=0) throw new Error();
            const products = await this.productsRepository.find({
                take: nlimit,
                skip: (npage-1)*nlimit,
                relations:{
                    category:true
                }
            })
            return products

        } catch (error) {
            throw new BadRequestException('Page and limit must be positive integers')
        }
    }

    async getById(id:string){
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: {
                category: true,
            },
        });
        if(!product) throw new NotFoundException(`No se encontro producto con ${id}`)
        return product;
    }

    async getProductByCategory(arrayCategories: string[]){
        
        const categorias = await this.categoriesRepository.find({
            where: { name: In(arrayCategories) }
        });
        
        
        const categoriaIds = categorias.map(categoria => categoria.id);
        console.log(categoriaIds)

        if (categoriaIds.length === 0) {
            return [];
        }
        
        
        const productos = await this.productsRepository.createQueryBuilder('products')
        .innerJoinAndSelect('products.category', 'categories')
        .where('categories.id IN (:...categoriaIds)', { categoriaIds })
        .getMany();
        return productos;
    }

    async createProduct(product:CreateProductdto, file: Express.Multer.File){
        const foundProduct = await this.productsRepository.findOneBy({name:product.name})
        if(foundProduct) throw new BadRequestException(`ya existe un producto con name: ${product.name}`)
        
        const category = product.category;
        const foundCategory = await this.categoriesRepository.findOneBy({name:category})
        if(!foundCategory) throw new BadRequestException(`Categoria:${product.category}  no existe en base de datos. Debera crea la categoria`)
        
        const uploadImage = await this.fileUploadRepository.uploadImage(file);
        if(!uploadImage) throw new BadRequestException('Hubo un error al subir la imagen')

        const objectProduct  = new Products();
        objectProduct.category = foundCategory;
        objectProduct.name = product.name
        objectProduct.description = product.description
        objectProduct.price = product.price
        objectProduct.imgUrl = uploadImage.url
        objectProduct.stock = product.stock
        objectProduct.discount = product.discount
        objectProduct.size = product.size

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

    async updateProduct(id:string, product:UpdatedProductdto, file?: Express.Multer.File){
        const productfound = await this.productsRepository.findOneBy({id})
        if(!productfound) throw new NotFoundException(`No se encontro producto con ${id}`)
        
        let imgUrl: string | undefined;
        
        if(file){
            const uploadImage = await this.fileUploadRepository.uploadImage(file);
            if(!uploadImage) throw new BadRequestException('Hubo un error al subir la imagen');
            imgUrl = uploadImage.url;
        }

        const updateData: Partial<Products> = {
            ...(product.name && { name: product.name }),
            ...(product.description && { description: product.description }),
            ...(product.price !== undefined && { price: product.price }),
            ...(product.stock !== undefined && { stock: product.stock }),
            ...(product.discount !== undefined && { discount: product.discount }),
            ...(imgUrl && { imgUrl })
        };

        if (product.category) {
            const foundCategory = await this.categoriesRepository.findOneBy({ name: product.category });
            if (!foundCategory) {
                throw new BadRequestException(`Categoria: ${product.category} no existe en base de datos. Debe crear la categoría primero.`);
            }
            updateData.category = foundCategory;
        }

        await this.productsRepository.update(id, updateData);
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

