import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
    
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>
    ){}

    async getAll(page:string, limit:string){
        try {
            const npage = Number(page)  
            const nlimit = Number(limit)
            if(npage<=0 || nlimit<=0) throw new Error();
            const users = await this.userRepository.find({
                take: nlimit,
                skip: (npage-1)*nlimit
            })
            return users

        } catch (error) {
            throw new BadRequestException('Page and limit must be positive integers')
        }
        
    }

    async getById(id:string){
        const user = await this.userRepository.findOneBy({id})
        if(!user) throw new BadRequestException(`No se encontro usario con ${id}`)
        const {password, isAdmin, isSuperAdmin, ...userInfoPublic} = user;
        return userInfoPublic;
    }

    async getByEmail(email:string){
        const user = this.userRepository.findOneBy({email});
        if(!user) throw new BadRequestException(`No se encontro usario con email ${email}`)
        return user        
    }

    async updateUser(id:string,newUser: Partial<Users>){
        const oldUser = this.userRepository.findOneBy({id});
        if(!oldUser) throw new BadRequestException(`No se encontro usario con ${id}`)
    
        if(newUser.password){
            const hashedPass = await bcrypt.hash(newUser.password,10);
            newUser = {...newUser,password:hashedPass}
        }

        await this.userRepository.update(id,newUser);
        const updatedUser = await this.userRepository.findOneBy({id});
        const {password, isAdmin, isSuperAdmin, ...userInfoPublic} = updatedUser;

        return userInfoPublic;
    }

    async createUser(user:CreateUserDto){
        const newUser = await this.userRepository.save(user)
        const dbUser = await this.userRepository.findOneBy({id:newUser.id})
        const {password, isAdmin, isSuperAdmin, ...userInfoPublic} = dbUser;
        return userInfoPublic;
    }

    async deleteUser(id:string){
        const user = await this.userRepository.findOneBy({id})
        if(!user) new BadRequestException(`No se encontro usario con ${id}`)
        this.userRepository.remove(user)
        const {password, isAdmin, isSuperAdmin, ...userInfoPublic} = user;
        return userInfoPublic;
    }
}
