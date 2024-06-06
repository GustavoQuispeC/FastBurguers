import { CanActivate, ConflictException, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "src/enum/roles.enum";

@Injectable()
export class AuthGuards implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
    ){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        
        try {
            const request = context.switchToHttp().getRequest()
            const token = request.headers.authorization?.split(' ')[1]
            // ['Bearer:', token]
            if(!token) throw new UnauthorizedException('No se envio token')

            const secret = process.env.JWT_SECRET
            const user = this.jwtService.verify(token, {secret})
            user.exp = new Date(user.exp * 1000)
            
            if(user.isSuperAdmin) user.roles = [Role.SUPERADMIN, Role.ADMIN]
            else if(user.isAdmin) user.roles = [Role.ADMIN] 
            else user.roles = [Role.USER] 

            console.log('valor verificado de token y secret mas tiempo de exp. es: ', user)
            request.user = user
            console.log('request.user: ', request.user)
            
            return true
            
        } catch (error) {
            
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token ha expirado');
            } else if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalido token');
            } else {
                throw new UnauthorizedException('No se puede verificar token');
            }
        }

        
    }
}


