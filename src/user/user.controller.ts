import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/updatedto.dto'
@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService){}
    // @Get()
    // async FindMany() {
    //     return this.userservice.GetMany();
    // }

    // @Get(':id')
    // async FindbyID(@Param('id') id: number){
    //     return  this.userservice.FindbyID(id);
    // }

    @Delete(':id')
    async DeleteUser(@Param('id') id: number){
        return this.userservice.DeleteUser(id);
    }

    @Put(':id')
    async UpdateUser(@Param('id') id: number, @Body() UserData: UpdateUserDTO){
        return this.userservice.UpdateUser(id, UserData);
    }
}
