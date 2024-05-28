import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
// import { LoginUsersDto, UsersDto } from "src/modules/users/users.dto";
import { CreateUserDto} from "src/modules/users/users.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('signin')
    signIn(@Body() credentials: Partial<CreateUserDto>){  
        const {email, password} = credentials
        return this.authService.signIn(email, password)
    }

    @Post('signup')
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user)
    }

}