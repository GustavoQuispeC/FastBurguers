import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { UsersDbService } from "./../users/usersdb.service";
// import { AuthRepository } from "./auth.repository";

@Module({ 
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [AuthService, UsersDbService],
    controllers: [AuthController]
})
export class AuthModule {}