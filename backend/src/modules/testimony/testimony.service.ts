import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimony } from 'src/entities/testimony.entity';
import { Repository } from 'typeorm';
import { CreateTestimonyDto } from './testimony.dto';

@Injectable()
export class TestimonyService {

    constructor(@InjectRepository(Testimony) private testimonyRepository: Repository<Testimony>){}

    async getTestimonials(page: string, limit: string) {
        try {
            const npage = Number(page)  
            const nlimit = Number(limit)
            if(npage<=0 || nlimit<=0) throw new Error();
            const users = await this.testimonyRepository.find({
                take: nlimit,
                skip: (npage-1)*nlimit
            })
            return users

        } catch (error) {
            throw new BadRequestException('Page and limit must be positive integers')
        }
    }

    async createTestimony(testimony: CreateTestimonyDto) {
        const newTestimony = await this.testimonyRepository.save(testimony)

        const findTestimony = await this.testimonyRepository.findOne({where: { email: newTestimony.email }})

        if (!findTestimony) throw new BadRequestException('Testimony not found after creation');

        const {name } = findTestimony;
        return { message: name + ' left a comment' };

    }

}
