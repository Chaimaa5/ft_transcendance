import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/updatedto.dto'
import { CreateFriendshipDTO } from './dto/createFriendship.dto';
@Controller('user')
export class UserController {
    constructor(private readonly userservice: UserService){}


    //User Management
    @Get()
    async FindMany() {
        return this.userservice.GetMany();
    }

    @Get(':id')
    async FindbyID(@Param('id') id: string){
        return  this.userservice.FindbyID(id);
    }

    @Get(':name')
    async FindbyName(@Param('name') name: string){
        return  this.userservice.FindbyName(name);
    }

    @Delete(':id')
    async DeleteUser(@Param('id') id: string){
        return this.userservice.DeleteUser(id);
    }

    @Put(':id')
    async UpdateUser(@Param('id') id: string, @Body() UserData: UpdateUserDTO){
        return this.userservice.UpdateUser(id, UserData);
    }

    //Friendship Management
    @Post('/add')
    async addFriend(@Body() dto: CreateFriendshipDTO){
        return this.userservice.addFriend(dto);
    }
//     addfriend
//     removefriend
//     block Friendship
//     unblockfriend
}
