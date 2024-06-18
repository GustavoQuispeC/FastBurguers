import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

interface ExtendedSocket extends Socket {
    user: any; // Cambia 'any' por el tipo correcto de tu usuario si lo tienes definido
  }

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient<ExtendedSocket>();
    const token = client.handshake.headers.authorization?.split(' ')[1];

    if (!token) {
        return false;
    }

    try {
        const secret = process.env.JWT_SECRET
        const user = this.jwtService.verify(token,{secret});
        client.user = user;
        return true;
    } catch (error) {
        return false;
    }
    }
}
