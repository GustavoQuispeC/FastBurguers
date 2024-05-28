import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { UsersService } from "src/modules/users/users.service";


@Module({ 
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [AuthService, UsersService],
    controllers: [AuthController]
})
export class AuthModule {}