import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enum/roles.enum'; 

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('elRol', [  // 'roles'
      context.getHandler(),
      context.getClass()
    ])
    console.log('requiredRoles: ' , requiredRoles)
    console.log('context.getHandler() es: ', context.getHandler())
    console.log('context.getClass() es: ', context.getClass())
    const request = context.switchToHttp().getRequest()
    const user = request.user // admin
    console.log('obteniendo el valor token y secret mas tiempo de exp. anteriormente: ', user)
    const hasRole = () => requiredRoles.some((role) => user.roles?.includes(role))
    console.log('valor hasRole() es: ', hasRole())
    const valid = user && user.roles && hasRole()

    if(!valid){
      throw new UnauthorizedException('No tiene permisos para acceder a esta ruta')
    }
    return valid
  }

}
