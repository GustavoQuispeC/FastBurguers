import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { LoginUsersDto, UsersDto } from "src/modules/users/users.dto";
import { CreateThirdUserDto, CreateUserDto, LoginThirdUserDto, LoginUserDto} from "src/modules/users/users.dto";
import { ApiTags } from "@nestjs/swagger";
import { Users } from "src/entities/users.entity";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('signin')
    async signIn(@Body() credentials: LoginUserDto){  
        const {email, password} = credentials
        return await this.authService.signIn(email, password)
    }

    @Post('signup')
    async signUp(@Body() user: CreateUserDto){
        return await this.authService.signUp(user)
    }

    @Post('third/signin')
    async signInThird(@Body() thirdCredentials: LoginThirdUserDto ){

        const credentials: LoginUserDto = {
            ...thirdCredentials,
            password: thirdCredentials.email
        }
        const {password, email} = credentials;
        return await this.authService.signIn(email,password)
    }

    @Post('third/signup')
    async signUpThird(@Body() thirdUser: CreateThirdUserDto){

        const user:CreateUserDto ={
            ...thirdUser,
            password:thirdUser.email,
            confirmPassword:thirdUser.email,
            address:"default",
            phone:999999999,
            city:"default",
            country:"default"
        }
        return await this.authService.signUp(user)
    }
}