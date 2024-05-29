import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { UsersService } from "src/modules/users/users.service";
import * as bcrypt from 'bcrypt'
import { CreateUserDto} from "src/modules/users/users.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}

    async signIn(email: string, password: string){ // iniciar sesion
        // verificar si existe el usuario
        const user = await this.usersService.getByEmail(email)
        if(!user) throw new BadRequestException('Credenciales incorrectas')

        // comparamos contraseñas
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword) throw new BadRequestException('Credenciales incorrectas')

        // firmar token
        const payload = {id: user.id, email: user.email, isAdmin: user.isAdmin, isSuperAdmin: user.isSuperAdmin}
        const token = this.jwtService.sign(payload)
        console.log('token creado y firmado es: ' , token)
        // retornar mensaje con el token
        const {password:passwordFound,id,isAdmin,isSuperAdmin,...infoPublicUser}=user
        return {
            message: 'Usuario logueado',
            token,
            data: infoPublicUser,
        }
    }

    async signUp(user: CreateUserDto){ // registrarse
        const findUser = await this.usersService.getByEmail(user.email)
        if(findUser){
            throw new ConflictException('El email ya ha sido registrado')
        }
        const hashedPassword = await bcrypt.hash(user.password, 10)
        if(!hashedPassword){
            throw new BadRequestException('Error al hashear constraseña')
        }
        const newUser = this.usersService.createUser({...user, password: hashedPassword}) 
        return newUser
    }

}