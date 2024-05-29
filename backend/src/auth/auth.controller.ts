import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
<<<<<<< HEAD
import { CreateUserDto} from "src/modules/users/users.dto";
=======
// import { LoginUsersDto, UsersDto } from "src/modules/users/users.dto";
import { CreateUserDto, LoginUserDto} from "src/modules/users/users.dto";
import { ApiTags } from "@nestjs/swagger";
>>>>>>> 0fc3169c6480b15d7f01b57d094b283f7fbd95cf

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('signin')
<<<<<<< HEAD
    signIn(@Body() credentials: Partial<CreateUserDto>){ 
=======
    signIn(@Body() credentials: LoginUserDto){  
>>>>>>> 0fc3169c6480b15d7f01b57d094b283f7fbd95cf
        const {email, password} = credentials
        return this.authService.signIn(email, password)
    }

    @Post('signup')
    signUp(@Body() user: CreateUserDto){
        return this.authService.signUp(user)
    }

}