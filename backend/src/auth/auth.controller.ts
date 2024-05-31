import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { LoginUsersDto, UsersDto } from "src/modules/users/users.dto";
import { CreateUserDto, LoginUserDto} from "src/modules/users/users.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('signin')
    signIn(@Body() credentials: LoginUserDto){  
        const {email, password} = credentials
        return this.authService.signIn(email, password)
    }

    @Post('signup')
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user)
    }

}