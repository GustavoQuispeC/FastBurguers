import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}

    @Get()
    getUsers(@Query('page') page:string, @Query('limit') limit:string){
        if(page && limit){
            return this.userService.getAll(page, limit)
        }
        return this.userService.getAll('1','5')
    }

    @Get(':id')
    getUser(@Param('id',ParseUUIDPipe) id:string){
        return this.userService.getById(id)
    }

    @Put(':id')
    updateUser(@Param('id',ParseUUIDPipe) id:string, @Body() user:UpdateUserDto){
        return this.userService.updateUser(id,user)
    }

    @Delete(':id')
    DeleteUser(@Param('id',ParseUUIDPipe) id:string){
        return this.userService.deleteUser(id)
    }

}
