import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entities/categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Categories) private categoryRepository: Repository<Categories>
    ){}

    async getAll(page:string, limit:string){
        try{
            const npage = Number(page)
            const nlimit =  Number(limit)
            if(npage<=0 || nlimit<=0) throw new Error();
            const categories = await this.categoryRepository.find({
                take: nlimit,
                skip:(npage-1)*nlimit
            })
            return categories
        } catch(error){
            throw new BadRequestException('Page y limit deben ser numeros enteros positivos')
        }
    }

    async getById(id:string){
        const categorie = await this.categoryRepository.findOneBy({id})
        if(!categorie) throw new BadRequestException(`No se encontro categorie con ${id}`)
        return categorie
    }

    async updateName(id:string,category:Partial<Categories>){
        const oldCategorie = this.categoryRepository.findOneBy({id})
        if(!oldCategorie) throw new BadRequestException(`No se encontro categorie con ${id}`)
        
        await this.categoryRepository.update(id,category);
        const updatedCategory =  await this.categoryRepository.findOneBy({id});
        return updatedCategory;
    }

    async createCategory(category: Partial<Categories>){
        
        const foundCategory = await this.categoryRepository.findOneBy({name:category.name})
        if(foundCategory) throw new BadRequestException(`Ya existe la categoria ${category.name}`)
        const newCategory = this.categoryRepository.save(category);
        return newCategory;
    }

    async deleteCategory(id:string){
        const foundCategory = await this.categoryRepository.findOneBy({id})
        if(!foundCategory) throw new BadRequestException(`No se encontro categorie con ${id}`)
        this.categoryRepository.remove(foundCategory)       
        return foundCategory;
    }

}
