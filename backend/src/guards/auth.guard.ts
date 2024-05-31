import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuards implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        // console.log(validate(request))

        const token = request.headers.authorization?.split(' ')[1]
        // console.log('el valor token es: ', token)
        // ['Bearer:', token]
        if(!token) throw new UnauthorizedException('No se envio token')

        const secret = process.env.JWT_SECRET
        const user = this.jwtService.verify(token, {secret})
        
        if(!user) throw new UnauthorizedException('Error al validar token')

        user.exp = new Date(user.exp * 1000)

        if(user.isSuperAdmin) user.roles = ['superAdmin'] 
        if(user.isAdmin) user.roles = ['admin'] 
        else user.roles = ['user'] 

        console.log('valor verificado de token y secret mas tiempo de exp. es: ', user)

        request.user = user
        console.log('request.user: ', request.user)
        
        return true
    }
}


